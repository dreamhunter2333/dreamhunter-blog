---
title: wsl2 docker compact vdisk
date: '2022-02-16 23:51:08'
categories:
    - linux
tags:
    - linux
    - wsl
---

# wsl2 docker compact vdisk

```ps
wsl --shutdown
diskpart
DISKPART> select vdisk file="<Path>\ext4.vhdx"
DISKPART> compact vdisk
DISKPART> detach vdisk
```
