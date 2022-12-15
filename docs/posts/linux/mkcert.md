---
title: mkcert 本地测试 https
date: '2022-12-15 14:36:57'
categories:
    - linux
tags:
    - linux
---

[https://github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert)

## 在需要连接 https 服务的机器或者容器上执行

```bash
mkcert -install
mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::1
```

## 拷贝证书到 https 服务所在目录

比如使用 `uvicorn`

```bash
python3 -m uvicorn main:app --host 0.0.0.0 --ssl-keyfile xxx-key.pem --ssl-certfile xxx.pem
```
