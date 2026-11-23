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

在 iOS 27 上从主屏幕打开 PWA 时，系统的顶部渐进模糊可能延伸到应用标题栏，让文字和按钮也变模糊。Awsl RemoteX 的做法是在视口顶部放一个不可见的固定元素，给 WebKit 提供主题背景色供采样，同时保留原有的安全区布局。 [Awsl RemoteX 的兼容改动](https://github.com/dreamhunter2333/awsl-remotex/commit/5d551a4ad03b31587576fb8f896ba50acd239ed2)

## 在 React 根节点外加一个空元素

在 `web/index.html` 的 `<body>` 中，把 `.ios-pwa-status-strip` 放在 React 挂载点 `#root` 前面。它没有内容，并用 `aria-hidden="true"` 从无障碍树中隐藏。

```html
<div class="ios-pwa-status-strip" aria-hidden="true"></div>
<div id="root"></div>
```

在 `web/src/styles.css` 中默认隐藏它。只有浏览器支持 `-webkit-touch-callout`、PWA 以 `standalone` 模式运行，并且项目的触屏检测给 `<html>` 设置了 `data-touch-device="true"` 时，才启用这段样式。

```css
.ios-pwa-status-strip {
  display: none;
}

@supports (-webkit-touch-callout: none) {
  @media (display-mode: standalone) {
    :root[data-touch-device="true"] .ios-pwa-status-strip {
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

`inset: 0 0 auto` 把元素固定在视口上沿并拉满宽度。固定定位让它脱离文档流，`pointer-events: none` 让点击和触摸穿过它。应用外壳仍通过 `env(safe-area-inset-*)` 为安全区留出空间。

## 为什么是 11px

WebKit 会在视口边缘寻找固定元素并采样其背景色。公开源码中的采样逻辑会跳过高度小于或等于 `10px` 的盒子，所以这里取 `11px`。元素的背景色跟随主题变量 `var(--panel)`。`background-clip: text` 只在文字轮廓内绘制背景，空元素没有文字可绘制，但仍保留背景色供 WebKit 采样。已有真机实验观察到，这种做法可以抑制 PWA 顶部模糊。 [WebKit 采样源码](https://github.com/WebKit/WebKit/blob/d620932d8ce37cf83f60d5c50dace2d50fed4f80/Source/WebCore/page/LocalFrameView.cpp#L2286-L2421) · [OJapp 真机实验](https://tips.ojapp.app/en/ios-27-pwa-top-blur-workaround-2/#method-2-add-a-dedicated-element-at-the-top)

## 真机验证

这是依赖 WebKit 当前采样行为的临时兼容方案。还需要在 iOS 27 真机上从主屏幕启动 PWA，对比修改前后的顶部模糊，并确认滚动、浅色和深色主题下的顶部控件都能正常操作。

如果同时改了 `apple-mobile-web-app-status-bar-style` 等状态栏元数据，先删除主屏幕上的旧入口，再从 Safari 重新添加并启动。 [Apple 的状态栏元数据说明](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html#//apple_ref/doc/uid/TP40008193-SW4)
