---
title: 保证消息的顺序性
date: '2021-03-17 22:40:29'
categories:
    - mq
tags:
    - mq
---

## 场景

先看看顺序会错乱的俩场景：

- RabbitMQ：一个 queue，多个 consumer
- Kafka：一个 topic，有三个 partition, 多个线程来并发处理消息

## 解决方案

- RabbitMQ：拆分多个 queue，每个 queue 一个 consumer
- Kafka：写 N 个内存 queue，具有相同 key 的数据都到同一个内存 queue；N 个线程，每个线程分别消费一个内存 queue
