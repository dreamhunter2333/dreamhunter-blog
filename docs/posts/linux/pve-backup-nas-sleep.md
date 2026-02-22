---
title: PVE 备份到 NAS 且不影响硬盘休眠
date: '2026-02-22 12:00:00'
categories:
    - linux
tags:
    - linux
    - pve
    - nas
    - smb
---

# PVE 备份到 NAS 且不影响硬盘休眠

PVE 直接添加 SMB/NFS 存储后，`pvestatd` 每 10 秒探测一次，NAS 机械硬盘永远无法休眠。

常见方案是先备份到本地再传 NAS，但系统盘空间小的话根本存不下。

这里用 vzdump 的 Hook 脚本 + `chattr +i` 实现按需挂载：平时不挂载，备份时自动挂 SMB，结束后自动卸载。

## 创建挂载点并锁定

```bash
mkdir -p /mnt/pve/nas_sleep
chattr +i /mnt/pve/nas_sleep
```

`chattr +i` 让目录不可写入，NAS 没挂上时备份会直接报错中止，不会把数据写进本地系统盘。mount 上去之后写入走的是 NAS 空间，不受影响。

## 注册为 PVE 存储

```bash
pvesm add dir NAS-Sleep --path /mnt/pve/nas_sleep --content backup,iso
```

## Hook 脚本

创建 `/root/autonas.sh`：

```bash
#!/bin/bash

# ================= NAS SMB Configuration =================
SMB_SERVER="192.168.x.x"
SMB_SHARE="PVE_Backup"
SMB_USER="root"
SMB_PASS="password"
MOUNT_PATH="/mnt/pve/nas_sleep"
# =========================================================

if [ "$1" == "job-start" ]; then
    echo ">>> Backup starting: Mounting NAS... <<<"

    mount -t cifs //${SMB_SERVER}/${SMB_SHARE} ${MOUNT_PATH} -o username=${SMB_USER},password=${SMB_PASS},soft,rw 2>/dev/null

    if mountpoint -q ${MOUNT_PATH}; then
        echo ">>> [SUCCESS] NAS is ready. <<<"
        exit 0
    else
        echo ">>> [FATAL ERROR] Failed to connect to NAS! Aborting. <<<"
        exit 1
    fi

elif [ "$1" == "job-end" ] || [ "$1" == "job-abort" ]; then
    echo ">>> Backup finished: Delegating polling unmount to systemd... <<<"

    systemd-run --quiet /bin/bash -c "
        for i in {1..12}; do
            sleep 5

            umount ${MOUNT_PATH} 2>/dev/null

            if ! mountpoint -q ${MOUNT_PATH}; then
                logger -t autonas '>>> [SUCCESS] NAS unmounted cleanly after '\$i' attempts.'
                exit 0
            fi
        done

        logger -t autonas '>>> [WARNING] Device busy for 60s, forcing lazy unmount.'
        umount -l ${MOUNT_PATH}
    "

    echo ">>> [INFO] Unmount task delegated to systemd. <<<"
fi
```

```bash
chmod +x /root/autonas.sh
```

## 绑定到 vzdump

```bash
echo "script: /root/autonas.sh" >> /etc/vzdump.conf
```

## 验证

在 PVE 网页端对任意虚拟机执行备份，目标存储选 `NAS-Sleep`。

备份完成后检查卸载是否成功：

```bash
journalctl -t autonas
```

看到 `NAS unmounted cleanly after X attempts` 就说明挂载已自动断开，NAS 可以正常休眠。
