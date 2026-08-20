---
title: PVE 中安装 Tiny10 与基础加固
date: '2026-08-21 09:00:00'
categories:
    - virtualize
tags:
    - pve
    - proxmox
    - tiny10
    - windows
    - virtio
---

# PVE 中安装 Tiny10 与基础加固

记录在 Proxmox VE（PVE）中部署 Tiny10 虚拟机的实操流程。文本中的主机名、IP、凭据均已脱敏，执行前请全部替换为自己的环境。

> Tiny10 为精简版 Windows 镜像，部分组件（如语言包、驱动、系统服务）可能缺失。请优先确认镜像合法来源并先创建快照。

## 1. 资源与镜像准备

- PVE 本地存储中准备好 Tiny10 ISO
- 准备最新的 virtio-win ISO（磁盘、网卡驱动）
- 预置 Windows 管理员账号（后续示例使用 `<WINDOWS_ADMIN>`）

示例占位符说明：

| 变量 | 说明 |
| --- | --- |
| `<VM_ID>` | PVE 虚拟机 ID |
| `<VM_IP>` | 虚拟机静态 IP |
| `<PREFIX>` | 子网前缀，如 `24` |
| `<GATEWAY>` | 默认网关 |
| `<DNS_SERVER>` | DNS 服务器 |
| `<USER>` | Windows 登录用户名 |
| `<USB_PATH>` | USB 直通设备路径 |

## 2. VM 建议配置（参考）

在创建 VM 时可按下列配置搭建：

- BIOS：`OVMF (UEFI)`
- Machine：`q35`
- CPU：`host` 或 `x86-64-v2-AES`
- 内存：`4 GiB` 起步
- 磁盘：`VirtIO SCSI`
- 网卡：`VirtIO (Paravirtualized)`
- EFI：开启
- TPM：按 Tiny10 要求可选启用

将 `virtio-win.iso` 挂载为附加 CD/DVD，安装过程中用于加载驱动。

## 3. 安装阶段加载磁盘与网卡驱动

若安装界面看不到磁盘：

1. 进入磁盘选择页点击“Load Driver”
2. 选择 `virtio-win.iso`
3. 按版本定位到 `vioscsi\w10\amd64` 或 `vioscsi\w11\amd64`
4. 选中 Red Hat VirtIO SCSI 驱动并加载

安装完成后如网卡未识别：

1. 打开设备管理器
2. 为网卡加载 `NetKVM\w10\amd64`（以镜像实际路径为准）

> 如果 `virtio-win.iso` 目录与示例不同，请以实际目录结构为准。

## 4. noVNC 与剪贴板

PVE 的 noVNC 剪贴板与 SPICE 剪贴板互不相同。若 noVNC 剪贴板不可用，可在 PVE 主机执行：

```bash
qm set <VM_ID> --vga clipboard=vnc
```

然后重开 noVNC 会话；浏览器侧需允许剪贴板权限。SPICE 客户端的行为受其协议限制，不一定与 noVNC 共通。

## 5. 预装常用组件

### 5.1 Firefox

```powershell
$installer = Join-Path $env:TEMP 'FirefoxESR.exe'
$url = 'https://download.mozilla.org/?product=firefox-esr-latest-ssl&os=win64&lang=zh-CN'

curl.exe -fL $url -o $installer
$signature = Get-AuthenticodeSignature $installer
if ($signature.Status -ne 'Valid' -or $signature.SignerCertificate.Subject -notmatch 'Mozilla Corporation') {
  Remove-Item $installer -Force
  throw 'Firefox 安装包签名校验失败'
}

Start-Process $installer -ArgumentList '-ms' -Wait
Remove-Item $installer -Force
```

### 5.2 OpenSSH（优先用系统可选组件）

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Set-Service sshd -StartupType Automatic
Start-Service sshd
```

如提示组件缺失，可改用 Win32-OpenSSH MSI 安装：

```powershell
if (-not (Get-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0 | Where-Object State -Eq Installed)) {
  $release = Invoke-RestMethod 'https://api.github.com/repos/PowerShell/Win32-OpenSSH/releases/latest'
  $asset = $release.assets |
    Where-Object { $_.name -match '^OpenSSH-Win64.*\.msi$' } |
    Select-Object -First 1
  if (-not $asset) { throw '未找到 Win64 OpenSSH MSI 安装包' }

  $installer = Join-Path $env:TEMP 'OpenSSH-Win64.msi'
  curl.exe -fL $asset.browser_download_url -o $installer

  $signature = Get-AuthenticodeSignature $installer
  if ($signature.Status -ne 'Valid' -or $signature.SignerCertificate.Subject -notmatch 'Microsoft Corporation') {
    Remove-Item $installer -Force
    throw '安装包签名校验失败'
  }

  Start-Process msiexec.exe -ArgumentList "/i `"$installer`" ADDLOCAL=Server /qn /norestart" -Wait
  Remove-Item $installer -Force
}

Set-Service sshd -StartupType Automatic
Start-Service sshd
```

> 以上命令仅示例发布源与下载逻辑，实际请按当前稳定发布页最新地址执行，并校验签名后再部署。

完成后检查服务状态与开机自启：

```powershell
Get-Service sshd
sc.exe qc sshd
```

远端验证：

```bash
ssh <USER>@<VM_IP>
```

> 不要在脚本或仓库中明文保存密码，默认用 SSH Key 登录。

## 6. 静态网络与基础连通性

### 6.1 安全性先行

从 PVE 主机先确认目标地址是否可用：

```bash
ip neigh show <VM_IP>
ping -c 3 <VM_IP>
```

仅 ping 通不足以证明可用，务必结合 ARP 与网络设备记录确认冲突。

### 6.2 Windows 内配置静态 IP

```powershell
Get-NetAdapter
```

假设网卡名为 `Ethernet`：

```powershell
netsh interface ipv4 set address `
  name="Ethernet" `
  static <VM_IP> 255.255.255.0 <GATEWAY> 1

netsh interface ipv4 set dnsservers `
  name="Ethernet" `
  static <DNS_SERVER> primary validate=no
```

执行网络重配后检查连通与解析：

```powershell
ipconfig /all
Test-NetConnection -ComputerName github.com -Port 443
```

## 7. SPICE Guest Tools 与输入体验

```powershell
$installer = Join-Path $env:TEMP 'spice-guest-tools.exe'
$url = 'https://www.spice-space.org/download/windows/spice-guest-tools/spice-guest-tools-latest.exe'

curl.exe -fL $url -o $installer
Start-Process $installer -ArgumentList '/S' -Wait
Remove-Item $installer -Force

Get-Service vdservice
```

安装完成建议重启一次，避免图形工具状态不一致。

## 8. 字体与中文显示

安装并注册中文字体后再统一配置终端，避免控制台乱码：

```powershell
[Console]::InputEncoding = [System.Text.UTF8Encoding]::new($false)
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
```

可优先补齐以下字体族（示例）：

- `LXGW WenKai`（界面）
- `LXGW WenKai Mono`（等宽）
- `JetBrains Mono`（代码）

在传统控制台可尝试设置：

```powershell
$consoleFonts = 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Console\TrueTypeFont'
New-ItemProperty -Path $consoleFonts -Name '000' -Value 'LXGW WenKai Mono' -PropertyType String -Force | Out-Null
New-ItemProperty -Path 'HKCU:\Console' -Name 'FaceName' -Value 'LXGW WenKai Mono' -PropertyType String -Force | Out-Null
```

## 9. 输入法与 USB 直通（按需）

### 9.1 输入法

若系统长期无中文输入，可按环境补充 `Microsoft` 或第三方输入法并设置为系统默认。

### 9.2 USB 直通

在确认无误后按物理路径绑定 USB 设备：

```bash
qm set <VM_ID> --usb0 host=<USB_PATH>
```

绑定前优先在测试环境验证，避免与主机关键外设冲突。

## 10. 验收清单

- 网卡、磁盘、显卡驱动可用
- noVNC 与 SPICE 剪贴板按预期工作
- `sshd` 运行且 22 端口可达
- 静态 IP、网关、DNS 配置正确
- 中文字体与控制台显示正常
- 关键操作留有快照或导出点

---

以上步骤适合用于「本地可控网络 + 需最小化系统体积」的场景。若你要在生产网络使用，建议再补一层堡垒主机和最小暴露端口策略。
