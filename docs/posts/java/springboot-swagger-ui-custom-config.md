---
title: springboot swagger3 自定义配置
date: '2021-03-26 00:23:14'
categories:
    - java
tags:
    - java
---

# springboot swagger3 自定义配置

## 自定义配置

忽略注解
Bearer Token 加入 swagger

```java
@Bean
public Docket createRestApi() {
    return new Docket(DocumentationType.OAS_30)
            .select()
            .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
            .paths(PathSelectors.any())
            .build().apiInfo(
                    new ApiInfoBuilder()
                            .title("Api Doc")
                            .description("Controller")
                            .build())
            // 忽略这两种注解
            .ignoredParameterTypes(RequestCustom.class, RequestHeader.class)
            // Bearer Token 加入 swagger
            .securitySchemes(Collections.singletonList(
                    new ApiKey("Authorization", "Authorization", "header")
            ))
            .securityContexts(Collections.singletonList(
                    SecurityContext.builder()
                            .securityReferences(Collections.singletonList(SecurityReference.builder()
                                    .scopes(new AuthorizationScope[0])
                                    .reference("Authorization")
                                    .build()))
                            .operationSelector(o ->
                                    o.requestMappingPattern().matches("/.*")
                            )
                            .build()));
```
