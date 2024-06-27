---
title: docker 容器访问主机
date: '2021-04-16 23:21:56'
categories:
    - docker
tags:
    - docker
---

# docker 容器访问主机

## windows macos

使用 `host.docker.internal` 即可

## Linux

```bash
# 第一种
--add-host=host.docker.internal:host-gateway
# 第二种
ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+'
# extra_hosts:
#     - "host.docker.internal:ip"
```
