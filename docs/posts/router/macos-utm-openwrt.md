---
title: macOS UTM 跑 OpenWrt 旁路由 + OpenClash 透明代理实战
date: '2026-02-12 12:00:00'
categories:
    - router
tags:
    - router
    - macos
    - openwrt
---

# macOS UTM 跑 OpenWrt 旁路由 + OpenClash 透明代理实战

春节回家没有软路由可用，家里只有一台光猫拨号的普通路由器。折腾了一下在 macOS 上用 UTM 虚拟机跑 OpenWrt 做旁路由，搭配 OpenClash + mihomo 内核实现透明代理，记录一下完整过程。

## 环境

| 项目 | 值 |
|------|-----|
| 宿主机 | macOS (Apple Silicon) |
| 虚拟化 | UTM (QEMU) |
| 镜像 | `openwrt-24.10.5-armsr-armv8-generic-ext4-combined-efi.img.gz` |
| 旁路由 IP | `192.168.2.150` |
| 主路由网关 | `192.168.2.1` |

## 准备镜像

解压 OpenWrt 官方 ext4 combined EFI 镜像

```bash
gunzip openwrt-24.10.5-armsr-armv8-generic-ext4-combined-efi.img.gz
```

UTM 中创建虚拟机导入 img，原始磁盘仅 232MB 不够用，关闭虚拟机后用 `qemu-img` 扩到 2G

```bash
qemu-img resize /path/to/openwrt.utm/Data/openwrt-24.10.5-armsr-armv8-generic-ext4-combined-efi.qcow2 2G
```

## 基础配置

### 网络

启动虚拟机，编辑 `/etc/config/network`，关键是配好网关和 DNS 指向主路由，这样旁路由才能上网

```text
config interface 'lan'
        option device 'br-lan'
        option proto 'static'
        option ipaddr '192.168.2.150'
        option netmask '255.255.255.0'
        option ip6assign '60'
        option gateway '192.168.2.1'
        list dns '223.5.5.5'
        list dns '114.114.114.114'
```

```bash
/etc/init.d/network restart
```

### 密码和 SSH

浏览器打开 `http://192.168.2.150` 进入 LuCI

- `System > Administration > Router Password` 设置 root 密码
- `System > Administration > SSH-Keys` 添加 SSH 公钥

### 换源

默认源在国内很慢，换成清华镜像

```bash
sed -i 's_https\?://downloads.openwrt.org_https://mirrors.tuna.tsinghua.edu.cn/openwrt_' /etc/opkg/distfeeds.conf
```

### 替换 dnsmasq

OpenClash 依赖 `dnsmasq-full`，需要先卸载再装

> 注意：替换 dnsmasq 会重置 `/etc/resolv.conf`，操作完需要重新写入 DNS

```bash
opkg update
opkg remove dnsmasq && opkg install dnsmasq-full

# 重新写入 DNS
echo "nameserver 223.5.5.5" > /etc/resolv.conf
echo "nameserver 114.114.114.114" >> /etc/resolv.conf
/etc/init.d/dnsmasq restart
```

## 扩容根分区

原始镜像根分区仅 104MB，装几个包就满了。通过 [官方扩容脚本](https://openwrt.org/docs/guide-user/advanced/expand_root) 在线扩容，前面 `qemu-img` 扩大的磁盘空间在这一步才真正被利用

```bash
opkg update
opkg install parted losetup resize2fs blkid

wget -U "" -O expand-root.sh "https://openwrt.org/_export/code/docs/guide-user/advanced/expand_root?codeblock=0"
. ./expand-root.sh

# 触发扩容，设备自动重启两次
sh /etc/uci-defaults/70-rootpt-resize
```

两次重启分别完成分区扩展（`parted`）和文件系统扩展（`resize2fs`），完成后 `df -h` 验证根分区已扩到 ~1.8G

## 安装软件包

### LuCI 中文 + Argon 主题

OpenWrt 上执行

```bash
opkg update
opkg install luci-i18n-base-zh-cn
```

宿主机上传 ipk 文件

```bash
scp -O luci-theme-argon_2.3.2-r20250207_all.ipk root@192.168.2.150:/tmp/
```

OpenWrt 上安装

```bash
opkg install /tmp/luci-theme-argon_2.3.2-r20250207_all.ipk
```

### OpenClash

宿主机上传 ipk 文件

```bash
scp -O luci-app-openclash_0.47.055_all.ipk root@192.168.2.150:/tmp/
```

OpenWrt 上安装依赖和 OpenClash

```bash
opkg install bash curl ca-bundle ip-full ruby ruby-yaml \
  kmod-tun kmod-inet-diag unzip kmod-nft-tproxy luci-compat luci luci-base

opkg install /tmp/luci-app-openclash_0.47.055_all.ipk
```

## 配置 OpenClash

安装完重启一次设备，让 OpenClash 初始化目录结构。然后从宿主机上传 mihomo 内核

> 注意要下载 **linux-arm64** 版本，不要下成 android 版

```bash
scp -O mihomo-linux-arm64-v1.19.20 root@192.168.2.150:/etc/openclash/core/clash_meta
```

最后在 LuCI `Services > OpenClash` 中上传订阅配置文件，启动即可。客户端将网关和 DNS 指向 `192.168.2.150` 就能走透明代理了
