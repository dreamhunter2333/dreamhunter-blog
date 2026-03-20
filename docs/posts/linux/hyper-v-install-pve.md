---
title: Hyper-V 安装 PVE（Proxmox VE）
date: '2026-03-20 12:00:00'
categories:
    - linux
tags:
    - linux
    - pve
    - proxmox
    - hyper-v
    - windows
---

# Hyper-V 安装 PVE（Proxmox VE）

记录一下在 Hyper-V 里安装 PVE 后需要处理的几个配置。

## 1. 启用嵌套虚拟化

这一步不打开，PVE 里的虚拟机基本没法正常使用硬件虚拟化。

> 注意：下面命令里的 `PVE` 只是示例虚拟机名称，实际执行时要替换成你自己 Hyper-V 里这台虚拟机的真实名字。

```powershell
# 查看虚拟机列表
Get-VM

# 查看处理器配置，确认 ExposeVirtualizationExtensions 状态
Get-VMProcessor -VMName PVE | fl
```

如果 `ExposeVirtualizationExtensions` 为 `False`，先关闭虚拟机，再执行：

```powershell
Set-VMProcessor -VMName PVE -ExposeVirtualizationExtensions $true
```

验证：

```powershell
Get-VMProcessor -VMName PVE | fl
```

## 2. 配置网络适配器

如果后面还要在 PVE 里继续跑虚拟机或 LXC，这一步不要漏。

打开 `Hyper-V 管理器 > 虚拟机设置`，进入：

`网络适配器 > 高级功能`

勾选：

- **启用 MAC 地址欺骗**

> 不启用 MAC 地址欺骗时，PVE 内部再往下挂出来的虚拟机和容器，网络通常都不正常。

## 3. 禁用 IPv6

PVE 宿主机上 Hyper-V 的虚拟网络默认启用 IPv6，可能导致 DNS 解析和包管理异常。

编辑 `/etc/default/grub`：

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet ipv6.disable=1"
```

更新并重启：

```bash
update-grub
reboot
```

重启后验证：

```bash
cat /proc/cmdline
# 确认包含 ipv6.disable=1
```

## 4. 配置 LXC 容器网络

这里最关键的是网关要和宿主机默认网关保持一致。

### 4.1 确认宿主机网络

```bash
# 查看宿主机网关和 IP
ip route
# 示例输出：default via 172.24.64.1 dev vmbr0
```

### 4.2 创建 LXC 容器时配置网络

在 PVE Web UI 创建 LXC 容器时：

| 配置项 | 值（示例） |
|--------|-----------|
| 网桥 | vmbr0 |
| IPv4 | Static |
| IPv4 地址 | 172.24.72.100/20 |
| 网关 | 172.24.64.1 |

> 注意：网关必须和宿主机 `ip route` 看到的默认网关一致，不要随意填写子网内其他地址。

### 4.3 命令行方式配置

```bash
# 创建时指定网络
pct create <CTID> <template> \
  --net0 name=eth0,bridge=vmbr0,ip=172.24.72.100/20,gw=172.24.64.1

# 修改已有容器的网络
pct set <CTID> -net0 name=eth0,bridge=vmbr0,ip=172.24.72.100/20,gw=172.24.64.1
```

### 4.4 验证网络

```bash
# 查看 IP 和路由
ip addr show
ip route
```

再用 `curl` 测试外网访问：

```bash
curl -s --connect-timeout 3 http://deb.debian.org -o /dev/null -w '%{http_code}'
```

> LXC 容器里 `ping` 有时会因为缺少 `cap_net_raw` 失败，这是正常现象。这里直接用 `curl` 测试更可靠。

## 5. Windows 防火墙放行

如果需要从 PVE 容器访问 Windows 宿主机，再加这条规则。

```powershell
# 管理员 PowerShell 执行，放行整个虚拟子网
New-NetFirewallRule -DisplayName 'Allow Hyper-V Subnet Inbound' -Direction Inbound -RemoteAddress 172.24.64.0/20 -Action Allow -Profile Any
```
