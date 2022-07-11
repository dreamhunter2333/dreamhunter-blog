---
title: locust 压测
date: '2022-07-11 20:43:29'
categories:
    - python
tags:
    - python
---

## 官网

[locust](https://github.com/locustio/locust)

## 示例

```python
from locust import HttpUser, task


class Demo(HttpUser):
    @task
    def demo(self):
        self.client.get("/")
```

## 运行

```bash
locust -f locustfile.py
```

打开 [http://localhost:8089/](http://localhost:8089/) 即可开始使用
