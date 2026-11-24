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

## 真机验证

这是依赖 WebKit 当前采样行为的临时兼容方案。需要在 iOS 27 真机上从主屏幕启动 PWA，对比修改前后的顶部模糊。切换浅色和深色主题，并确认滚动时顶部控件仍能正常操作。

如果同时改了 `apple-mobile-web-app-status-bar-style` 等状态栏元数据，先删除主屏幕上的旧入口，再从 Safari 重新添加并启动。
