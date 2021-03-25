---
title: springboot 禁用自动配置
date: '2021-03-26 00:27:18'
categories:
    - java
tags:
    - java
---

## 禁用自动配置

```java
/**
 * 禁用数据库自动配置
 */
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
```
