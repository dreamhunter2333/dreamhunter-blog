---
title: wsl2 使用 Windows ip
date: '2021-07-11 23:59:55'
categories:
    - linux
tags:
    - linux
    - wsl
---

## 查询 win 的 ip

```bash
cat /etc/resolv.conf|grep nameserver|awk '{print $2}'
```

## 使用 win 的代理

```bash
export winip=`cat /etc/resolv.conf|grep nameserver|awk '{print $2}'` && export HTTP_PROXY=http://$winip:8889 && export HTTPS_PROXY=http://$winip:8889
```
