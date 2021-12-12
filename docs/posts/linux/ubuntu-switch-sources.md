---
title: Ubuntu 使用阿里云软件源
date: '2021-12-12 17:21:34'
categories:
    - linux
tags:
    - linux
---

[Ubuntu 使用阿里云软件源](https://www.bbsmax.com/A/Ae5RpLLzQ9/)

```bash
sudo sed -i s/archive.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list
sudo sed -i s/security.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list
sudo apt-get update
```

or

```bash
sudo sed -i s/cn.archive.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list
sudo sed -i s/security.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list
sudo apt-get update
```
