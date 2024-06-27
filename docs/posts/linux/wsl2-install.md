---
title: wsl2 安装 和 ssh xrdp 端口转发
date: '2021-07-11 22:40:45'
categories:
    - linux
tags:
    - linux
    - wsl
---

# wsl2 安装 和 ssh xrdp 端口转发


## 1. 启用 wsl2

[官方文档](https://aka.ms/wsl2)

```ps1
# 导出官方包自定义安装目录重新安装，也可以恢复之前打好的安装包，避免重复配置
wsl --export Ubuntu-20.04 d:\wsl-ubuntu20.04.tar
wsl --import ubuntu20 d:\wsl\ubuntu20 d:\wsl-ubuntu20.04.tar
```

## 配置环境

### 创建用户

```bash
useradd -m -s /bin/bash <用户名>
passwd <用户名>
# 授予该用户 sudo 权限。
usermod -aG sudo <用户名>
```

### 安装中文语言包

```bash
# 安装中文语言包
sudo apt-get install  language-pack-zh-hans
sudo apt install $(check-language-support)
mkdir -p /usr/share/fonts/windows
cp -r /mnt/c/Windows/Fonts/*.ttf /usr/share/fonts/windows/
locale-gen zh_CN.UTF-8
sudo dpkg-reconfigure locales
```

### 安装zsh

```bash
sudo apt install zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### xrdp 远程图形界面的配置

```bash
sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get upgrade -y && sudo apt-get dist-upgrade -y && sudo apt-get autoremove -y
sudo apt-get update
sudo apt-get install xorg
sudo apt-get install xfce4
sudo apt-get install xrdp
sudo sed -i 's/port=3389/port=33389/g' /etc/xrdp/xrdp.ini
sudo echo xfce4-session >~/.xsession
sudo service xrdp restart
```

```bash
# xrdp 打不开程序 执行
sudo apt install libexo-1-0
```

`mstsc` 连接即可

## 转发 wsl2 端口脚本

重装 openssh-server
并配置端口号，密码登录，监听地址

```bash
sudo apt remove openssh-server
sudo apt install openssh-server
sudo nano /etc/ssh/sshd_config
```

wsl 里面新建 sh 文件，内容如下

```bash
ip a |grep -w "inet"|grep -w "eth0"|cut -d " " -f 6 | cut -d "/" -f 1
```

windows 下新建 bat 文件，内容如下

```bat
wsl -u root service xrdp restart
wsl -u root service ssh --full-restart
for /F %%i in ('wsl bash /home/dreamhunter/Documents/wslip.sh') do (set wslip=%%i)
echo wslip=%wslip%
netsh interface portproxy delete v4tov4 listenaddress=192.168.2.97  listenport=33389
netsh interface portproxy add v4tov4 listenaddress=192.168.2.97  listenport=33389 connectaddress=%wslip% connectport=33389
netsh interface portproxy delete v4tov4 listenaddress=192.168.2.97  listenport=22222
netsh interface portproxy add v4tov4 listenaddress=192.168.2.97  listenport=22222 connectaddress=%wslip% connectport=22222
netsh interface portproxy show all
```

Windows 防火墙 新增规则，开放 22222 33389 端口

## ssh 免密登录

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub dreamhunter@192.168.2.97 -p 22222
```
