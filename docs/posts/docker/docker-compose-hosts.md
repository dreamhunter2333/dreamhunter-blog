---
title: docker-compose hosts 参数
date: 2021-01-24 00:53:53
categories:
    - docker
tags:
    - docker
---

## docker-compose hosts 参数

```yaml
version: '2'
services:
  xxx:
    hostname: xxx
    container_name: xxx
    image: xxx
    restart: always
    extra_hosts:
        - "a.com:1.1.1.1"
```
