---
title: Spring RedisTemplate
date: '2021-01-28 00:25:57'
categories:
    - java
tags:
    - java
    - spring
    - redis
---

# Spring RedisTemplate

## RedisConfig 配置

```java
@Configuration
@Slf4j
public class RedisConfig {

  @Autowired
  private RedisConnectionFactory factory;

  @Bean
  public RedisTemplate<String, Object> redisTemplate() {
    RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
    // 设置字符串序列化方式
    redisTemplate.setKeySerializer(new StringRedisSerializer());
    redisTemplate.setHashKeySerializer(new StringRedisSerializer());
    redisTemplate.setHashValueSerializer(new StringRedisSerializer());
    redisTemplate.setValueSerializer(new StringRedisSerializer());
    redisTemplate.setConnectionFactory(factory);
    return redisTemplate;
  }

  @Bean
  public HashOperations<String, String, String> hashOperations(RedisTemplate<String, Object> redisTemplate) {
    return redisTemplate.opsForHash();
  }
}
```

## RedisUtils 工具类

```java
@Component
@Slf4j
public class RedisUtils {

  @Autowired
  private RedisTemplate<String, Object> redisTemplate;
  @Autowired
  private HashOperations<String, String, String> hashOperations;

  public Boolean expire(String key, long time) {
    return redisTemplate.expire(key, time, TimeUnit.SECONDS);
  }
```
