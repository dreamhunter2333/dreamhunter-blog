---
title: 用一个不可见的固定元素绕过 iOS 27 PWA 顶部模糊
date: '2026-11-24'
categories:
  - frontend
tags:
  - iOS
  - PWA
  - WebKit
  - CSS
---

# 用一个不可见的固定元素绕过 iOS 27 PWA 顶部模糊

在 iOS 27 上从主屏幕打开 PWA 时，顶部的渐进模糊可能延伸到标题栏。可以在视口上沿放一个不可见的固定元素，给 WebKit 提供主题背景色供采样，以减轻顶部模糊。

## 添加顶部固定元素

在 `<body>` 内、应用根容器外放一个空元素，用 `aria-hidden="true"` 将它从无障碍树中隐藏。

```html
<div class="ios-pwa-status-strip" aria-hidden="true"></div>
```

样式默认隐藏该元素，只在支持 `-webkit-touch-callout`、存在触屏这类粗略指针输入且以 `standalone` 模式运行时启用。`--panel` 应在根元素上定义为随主题切换的不透明背景色。

```css
.ios-pwa-status-strip {
  display: none;
}

@supports (-webkit-touch-callout: none) {
  @media (display-mode: standalone) and (any-pointer: coarse) {
    .ios-pwa-status-strip {
      display: block;
      position: fixed;
      inset: 0 0 auto;
      height: 11px;
      z-index: 2147483647;
      pointer-events: none;
      background-color: var(--panel);
      -webkit-background-clip: text;
      background-clip: text;
    }
  }
}
```

`inset: 0 0 auto` 让元素贴住视口上沿并铺满宽度。固定定位让它脱离文档流，`pointer-events: none` 让点击和触摸穿过它。继续保留页面原有的 `env(safe-area-inset-*)` 安全区布局。

## 为什么是 11px

WebKit 的边缘颜色采样会跳过高度小于或等于 `10px` 的盒子，所以这里取 `11px`。`background-clip: text` 把背景裁剪到文字轮廓。元素没有文字，因此页面上看不到色条，WebKit 的采样逻辑仍可以读取样式里的背景色。

## 让应用底部留在可视视口内

如果全屏容器仍用 `100vh` 撑开，当它比可视视口高时，底部的工具栏或输入框可能被裁掉。先用 `100dvh`，再在 WebKit 的独立 PWA 模式下用实际测得的高度覆盖它。

```css
.app-shell {
  box-sizing: border-box;
  height: var(--app-viewport-height, 100dvh);
}
```

用 `visualViewport.height * visualViewport.scale` 抵消页面缩放对高度读数的影响，再用 `window.innerHeight` 限制上限。在视口变化和页面恢复显示时重新计算。

```js
const root = document.documentElement;
const viewport = window.visualViewport;
const standalone = navigator.standalone ||
  window.matchMedia('(display-mode: standalone)').matches;

if (standalone && viewport && CSS.supports('-webkit-touch-callout', 'none')) {
  const syncHeight = () => {
    if (root.dataset.keyboardOpen === 'true') return;
    const scale = viewport.scale > 0 ? viewport.scale : 1;
    const height = Math.min(window.innerHeight, viewport.height * scale);
    root.style.setProperty('--app-viewport-height', `${height}px`);
  };

  new MutationObserver(syncHeight).observe(root, {
    attributeFilter: ['data-keyboard-open'],
  });
  viewport.addEventListener('resize', syncHeight);
  viewport.addEventListener('scroll', syncHeight);
  window.addEventListener('resize', syncHeight);
  window.addEventListener('pageshow', syncHeight);
  syncHeight();
}
```

如果页面已有软键盘适配，让它在键盘弹出时给 `<html>` 设置 `data-keyboard-open="true"`，并用 `visualViewport.height` 直接更新同一个变量，让输入框贴在键盘上方。键盘收起后移除标记，恢复常态高度。底栏继续用 `env(safe-area-inset-bottom)` 为主屏幕指示条留出空间。

## 真机验证

这是依赖 WebKit 当前采样行为的临时兼容方案。需要在 iOS 27 真机上从主屏幕启动 PWA，对比修改前后的顶部模糊。切换浅色和深色主题，并确认滚动时顶部控件仍能正常操作。横竖屏切换、切回应用和开合键盘后，检查底栏和输入框是否仍在可见范围内。

如果同时改了 `apple-mobile-web-app-status-bar-style` 等状态栏元数据，先删除主屏幕上的旧入口，再从 Safari 重新添加并启动。
