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

iOS 27 上从主屏幕打开 PWA，顶部的模糊盖到标题栏时，文字和按钮也会跟着糊。在视口上沿放一个 11px 高的空元素，让 WebKit 取到主题背景色。

## 顶部模糊

把这个 `div` 放在 `<body>` 里、应用根容器外面。

```html
<div class="ios-pwa-status-strip" aria-hidden="true"></div>
```

样式只在触屏 WebKit 的独立 PWA 模式下启用。给 `<html>` 上的 `--panel` 设一个跟随主题的不透明背景色。

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

WebKit 给贴边的固定元素取色时会跳过高度不超过 `10px` 的盒子，`11px` 刚过这条线。`background-clip: text` 只在文字轮廓里画背景。`div` 是空的，页面上看不到色条，WebKit 仍能读取它的背景色。

色条贴住视口上沿，横向铺满。固定定位让它不占布局空间，`pointer-events: none` 让下面的按钮照常能点。保留原有的安全区留白。

## 底部越界

全屏容器用 `100vh` 撑开，一旦比可视区域高，底栏就会掉到屏幕外。默认高度改用 `100dvh`，在 WebKit 的独立 PWA 模式下再用测得的高度覆盖。

```css
.app-shell {
  box-sizing: border-box;
  height: var(--app-viewport-height, 100dvh);
}
```

把 `visualViewport.height` 乘回缩放倍率，再和 `window.innerHeight` 取较小值。视口变化时重算一次。

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

已有键盘适配的页面共用 `--app-viewport-height`。键盘弹出时，在 `<html>` 上设 `data-keyboard-open="true"`，并把变量写成 `visualViewport.height` 的像素值。键盘收起后删掉标记，上面的代码就会重算高度。底栏继续用 `env(safe-area-inset-bottom)` 留出主屏幕指示条的位置。

改过 `apple-mobile-web-app-status-bar-style` 的话，先删掉主屏幕上的旧入口，再从 Safari 添加一次。从主屏幕打开 PWA，检查顶部模糊以及键盘开合时的底栏位置。
