---
title: 消息队列的高可用
date: '2021-03-16 23:53:42'
categories:
    - mq
tags:
    - mq
---

# 消息队列的高可用

## RabbitMQ 的高可用性

RabbitMQ 基于主从（非分布式）做高可用性的

RabbitMQ 有三种模式

- 单机模式 Demo 级别
- 普通集群模式（无高可用性）
- 镜像集群模式（高可用性）

## Kafka 的高可用性

Kafka 一个最基本的架构认识：由多个 broker 组成，每个 broker 是一个节点；你创建一个 topic，这个 topic 可以划分为多个 partition，每个 partition 可以存在于不同的 broker 上，每个 partition 就放一部分数据。

这就是天然的分布式消息队列，就是说一个 topic 的数据，是分散放在多个机器上的，每个机器就放一部分数据。
