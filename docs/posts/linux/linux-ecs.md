---
title: 从零用云服务器搭建一个网站
date: '2021-03-06 19:15:51'
categories:
    - linux
tags:
    - linux
---

## 获得一台云服务器

[华为云注册链接](https://account.huaweicloud.com/obmgr/invitation/invitation.html?bpName=000000010000000220F09BA4558663AF2BB80A420A22721A1E675284FC7478EE78DC81B67C29A09A36180C862FA6478F06D4C9D0B022D2A84AC409C89E4221C659A86DD0808C0F22&inviteCode=0000000100000002DFF0DC9FF7D354CCC0E1A0D7E689204940A6FF7906AA81F99C0594BF4A2DA420&bindType=1&isDefault=1)

## 创建用户

```bash
# 创建一个有 root 权限的用户
sudo adduser demo
# 并将其加入 sudoers
# root ALL=(ALL) ALL
# demo ALL=(ALL) ALL
sudo nano /etc/sudoers
```

## 安装依赖

更新依赖

```bash
# 更新依赖
sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get upgrade -y && sudo apt-get dist-upgrade -y && sudo apt-get autoremove -y
```

安装 docker，后续的部署全部通过 docker
[docker 安装文档](https://developer.aliyun.com/article/110806)

```bash
# step 1: 安装必要的一些系统工具
sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common
# step 2: 安装GPG证书
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
# Step 3: 写入软件源信息
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
# Step 4: 更新并安装 Docker-CE
sudo apt-get -y update
sudo apt-get -y install docker-ce
```

使普通用户可以使用 docker

```bash
# 添加到用户组
sudo gpasswd -a $USER docker
# 重新登录
# 重启
service docker restart
```

安装 docker-compose (懒人必备)

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

## 本地打包 网站 docker 镜像

[vuepress](https://www.vuepress.cn/guide/getting-started.html)

编写网站内容

```bash
mkdir vuepress-starter && cd vuepress-starter
yarn init
yarn add -D vuepress # npm install -D vuepress
mkdir docs && echo '# Hello VuePress' > docs/README.md
yarn docs:dev
yarn docs:build
```

## 编写 Dockerfile

```docker
FROM nginx:latest

RUN mkdir /app
COPY ./docs/.vuepress/dist /app/dist
COPY ./docker/conf.d /etc/nginx/conf.d

EXPOSE 80 443
```

打包镜像

```bash
docker build -f docker/Dockerfile -t xxx/vuepress-starter:latest .
docker push xxx/vuepress-starter:latest
```

## 服务器端编写 docker-compose.yml

```yml
version: '2'
services:
  vuepress-starter:
    container_name: vuepress-starter
    image: swr.cn-east-3.myhuaweicloud.com/huaweicloud-dreamhunter/vuepress-starter:latest
    restart: always
    ports:
      - '80:80'
```

启动, 冲

```bash
docker-compose up -d
```

## 附录

### 安装 zsh screenfetch

```bash
sudo apt install zsh screenfetch
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### vscode 链接服务器

使用 ms-vscode-remote.remote-ssh 插件
让操作服务器和在本地一样方便
