---
title: java spring WebClient 代理访问
date: '2021-03-24 15:25:48'
categories:
    - java
tags:
    - java
---

## jvm 参数设置

```bash
-DproxySet=true -DproxyHost=127.0.0.1 -DproxyPort=8866
```

## java 程序设置

```java
System.setProperty("https.proxyHost", "127.0.0.1");
System.setProperty("https.proxyPort", "8866");
```

## WebClient 代理访问

```java
@Bean(webClient)
public WebClient webClient() {
    ReactorClientHttpConnector connector = new ReactorClientHttpConnector(options -> options
    .httpProxy(addressSpec -> addressSpec
        .address(new InetSocketAddress("127.0.0.1", 8866)))
    );
    return WebClient.builder().codecs(
            (config) -> config.defaultCodecs().maxInMemorySize(maxInMemorySize * 1024 * 1024)
    ).clientConnector(connector)
            .build();
}
```
