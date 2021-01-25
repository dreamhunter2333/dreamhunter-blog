---
title: nginx Access-Control-Allow-Origin
date: '2020-11-20 21:36:11'
categories: nginx
tags:
    - nginx
---

## nginx Access-Control-Allow-Origin

```nginx
server {

    listen 80;
    server_name www.demo.com;



    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $host;

    location /demo {

        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Credentials' 'true';  
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS';  
            add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,token';  
            return 204;
        }

        proxy_pass  http://demo;
    }
}
```
