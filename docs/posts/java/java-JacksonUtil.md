---
title: java JacksonUtil
date: '2020-12-30 21:43:14'
categories: java
tags:
    - java
---

# java JacksonUtil

## java JacksonUtil json处理工具封装

虽然阿里巴巴开源的 JSON 解析库 fastjson 很快很好用，但是因为一些安全性的问题，

[附链接](https://juejin.cn/post/6912250865025810440)

我们还是选用了 `com.fasterxml.jackson`

```java
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
 
import java.util.List;
import java.util.Map;
 
@Slf4j
public class JacksonUtil {
 
    /**
     * 转换为 JSON 字符串，忽略空值
     *
     * @param obj 对象
     * @return String
     * @throws JsonProcessingException 错误
     */
    public static String obj2jsonIgnoreNull(Object obj) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        return mapper.writeValueAsString(obj);
    }
 
    /**
     * JsonNode 转换为 String
     *
     * @param node JsonNode
     * @return String
     */
    public static String jsonNode2String(JsonNode node) {
        if (node == null) {
            return "";
        }
        try {
            return node.asText("");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return "";
    }
 
    /**
     * JsonNode 转换为 int
     *
     * @param node JsonNode
     * @return int
     */
    public static int jsonNode2Int(JsonNode node, int defaultValue) {
        if (node == null) {
            return defaultValue;
        }
        try {
            return node.asInt(defaultValue);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return defaultValue;
    }
 
    /**
     * JsonNode 转换为 List<Object>
     *
     * @param node JsonNode
     * @return List<Object>
     */
    public static List<Object> jsonNode2ObjectList(JsonNode node) {
        if (node == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        try {
            return mapper.convertValue(node, new TypeReference<List<Object>>() {});
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return null;
    }
 
    /**
     * JsonNode 转换为 Map<String, Object>
     *
     * @param node JsonNode
     * @return Map<String, Object>
     */
    public static Map<String, Object> jsonNode2Map(JsonNode node) {
        if (node == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        try {
            return mapper.convertValue(node, new TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return null;
    }
 
    /**
     * JsonNode 转换为 <T>
     *
     * @param node JsonNode
     * @param clazz Class<T>
     * @return List<Object>
     */
    public static <T> T jsonNode2Object(JsonNode node, Class<T> clazz) {
        if (node == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        try {
            return mapper.treeToValue(node, clazz);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage(), e);
        }
        return null;
    }
 
    /**
     * Object 转换为 JsonNode
     *
     * @param node Object
     * @return JsonNode
     */
    public static JsonNode object2JsonNode(Object node) {
        if (node == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        try {
            return mapper.convertValue(node, JsonNode.class);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return null;
    }
 
    /**
     * String 转换为 JsonNode
     *
     * @param json String
     * @return JsonNode
     */
    public static JsonNode toNode(String json) {
        if (json == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        try {
            return mapper.readTree(json);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage(), e);
        }
        return null;
    }
}
```
