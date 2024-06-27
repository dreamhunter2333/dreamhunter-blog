---
title: Java Spring MyBatis 注解
date: '2021-02-24 22:21:27'
categories:
    - java
tags:
    - java
---

# Java Spring MyBatis 注解

## application.yml 开启驼峰映射

```yml
mybatis:
    configuration:
    # 开启驼峰映射
        map-underscore-to-camel-case: true
```

## CRUD 注解

- `@Select`
- `@Insert`
- `@Update`
- `@Delete`

## 映射注解 Results

为了解决对象属性和字段驼峰不一致的问题，我们可以使用映射注解@Results来指定映射关系。

- `@Results` 用于填写结果集的多个字段的映射关系.
- `@Result` 用于填写结果集的单个字段的映射关系.
- `@ResultMap` 根据ID关联XML里面 `<resultMap>`

```java
@Results({
        @Result(property = "userId", column = "USER_ID"),
        @Result(property = "username", column = "USERNAME"),
        @Result(property = "password", column = "PASSWORD"),
        @Result(property = "mobileNum", column = "PHONE_NUM")
})
@Select("select * from t_user")
List<User> list();
```

## CRUD 高级注解

- `@SelectProvider`
- `@InsertProvider`
- `@UpdateProvider`
- `@DeleteProvider`
