---
title: docker 部署 trojan-go acme nginx 自动申请证书
date: '2021-12-12 17:30:07'
categories:
    - linux
tags:
    - linux
    - trojan
    - ssr
    - 酸酸乳
---

# docker 部署 trojan-go acme nginx 自动申请证书

## 准备

- 注册好的网站域名
- 使用 cloudflare 解析你的域名（子域名也可）
- cloudflare 邮箱 cloudflare-key 进行文件的初始化
- 想一个 trojan 服务的密码

## docker-compose.yml

```bash
git clone https://github.com/dreamhunter2333/docker-trojan-go
cd docker-trojan-go
# 1. 输入 网站  trojan服务的密码 cloudflare邮箱 cloudflare-key 进行文件的初始化
bash init.sh
# 2. 申请证书
bash new.sh
# 3. 重启/启动服务，证书在重启时会检查是否过期，过期了重新申请
bash restart.sh
```
