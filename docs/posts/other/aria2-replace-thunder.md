---
title: aria2 替代迅雷
date: '2022-02-20 23:28:15'
categories:
    - other
tags:
    - aria2
    - other
---

## 安装

```bash
# macos
brew install aria2
# ubuntu
sudo apt install aria2
```

## 下载文件

```bash
# 链接可以为直链 磁力链接 种子文件
aria2c -s 8 -x 8 -d /mnt/tool/anime/Akebi-chanNoSailor-fuku -c "链接1" "链接2" --allow-overwrite=true
```

## aria2 github

[aria2](https://github.com/aria2/aria2)
