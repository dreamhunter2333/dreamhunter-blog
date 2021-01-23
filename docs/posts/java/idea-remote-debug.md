---
title: idea 远程调试
date: 2021-01-23 11:53:53
categories:
    - java
tags:
    - java
---

## idea 远程调试

### jar 包启动参数

```yaml
JAVA_OPTS: '-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005'
```

### idea debug 配置

![idea-remote-debug](/imgs/java/idea-remote-debug.png)
