---
title: 安装 source-code-pro 字体
date: '2020-03-21 23:10:44'
categories:
tags:
---

# 安装 source-code-pro 字体

![source-code-pro](/imgs/source-code-pro/source-code-pro.png)

## mac 安装 source-code-pro 字体

```bash
brew tap homebrew/cask-fonts && brew cask install font-source-code-pro
```

## linux 安装 source-code-pro 字体

```bash
git clone https://github.com/adobe-fonts/source-code-pro.git
cd source-code-pro
cp -r TTF/ /usr/share/fonts/truetype/source-code-pro
fc-cache -f -v
```

## windows 安装 source-code-pro 字体

```bash
git clone https://github.com/adobe-fonts/source-code-pro.git
# 将 source-code-pro/TTF/ 拷贝到 C:\Windows\Fonts
```

## vscode 使用 source-code-pro 字体

```json
{
    "editor.fontFamily": "'Source Code Pro'",
    // ...
}
```
