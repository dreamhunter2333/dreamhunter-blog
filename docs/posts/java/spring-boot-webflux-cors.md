---
title: spring boot webflux cors
date: '2020-12-10 21:42:03'
categories: java
tags:
    - spring
---

# spring boot webflux cors

## spring boot webflux 允许跨域

```java
@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {
 
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 允许 GET POST OPTIONS DELETE 接口跨域
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET","POST", "OPTIONS", "DELETE")
                .maxAge(3600);
    }
 
}
```
