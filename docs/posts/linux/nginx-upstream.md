---
title: nginx upstream
date: '2020-11-10 21:33:43'
categories: nginx
tags:
    - nginx
---

# nginx upstream

## nginx upstream

```nginx
upstream demo{
    server demo1:8080;
    server demo2:8080;
}

server {
    listen 80;
    server_name www.demo.com;

    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $host;

    location / {
        proxy_pass  http://demo;
    }
}
```
