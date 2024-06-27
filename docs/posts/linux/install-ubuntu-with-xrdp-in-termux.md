---
title: Install ubuntu with xrdp in termux
date: '2021-12-28 23:19:37'
categories:
    - linux
tags:
    - linux
    - termux
    - android
---

# Install ubuntu with xrdp in termux


## Install termux

[termux-app github](https://github.com/termux/termux-app)
[termux-app f-droid](https://f-droid.org/en/packages/com.termux/)

## Install dependencies

```bash
# Update termux
apt-get update && apt-get upgrade -y
# Install ssh server
apt install openssh -y
# start ssh
sshd
# modify passwd and connect from client
passwd
# Install dependencies
apt install zsh git wget neofetch -y
apt-get install proot -y
apt install proot-distro
# Install ohmyzsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# Install and login ubuntu
proot-distro install ubuntu
proot-distro login ubuntu
```

## Install dependencies in ubuntu

```bash
# Update termux
apt-get update && apt-get upgrade -y
# Install dependencies
apt install zsh git wget neofetch -y
# Install ohmyzsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# Install xfce4 xrdp
apt-get install xorg xfce4 xrdp -y
apt install libexo-1-0
# modify port of xrdp
sed -i 's/port=3389/port=33389/g' /etc/xrdp/xrdp.ini
echo xfce4-session > ~/.xsession
service xrdp restart
```

## connect with Microsoft Remote Desktop

![mstsc](/pic/install-ubuntu-with-xrdp-in-termux/mstsc.png)
