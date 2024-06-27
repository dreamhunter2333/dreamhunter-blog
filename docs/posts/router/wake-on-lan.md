---
title: Wake-on-LAN
date: '2022-10-10 17:04:18'
categories:
    - router
tags:
    - router
---

# Wake-on-LAN

[原文](https://bitbucket.org/padavan/rt-n56u/wiki/EN/CommonTips)

How to turn on a computer using the router's WEB-interface
You can turn on a computer on the local network from the WEB-interface - just press Wake up opposite to the necessary device from the list or by entering its MAC-address in the appropriate field.

How to turn on a computer on the local network using the script

```bash
ether-wake -i br0 XX:XX:XX:XX:XX:XX
```

Where XX:XX:XX:XX:XX:XX is a MAC-address of the computer that you want to wake up on a schedule.
