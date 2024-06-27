---
title: 互斥锁实现一个死锁
date: '2021-05-10 14:11:32'
categories:
    - python
tags:
    - python
---

# 互斥锁实现一个死锁

创建两个互斥锁 A B
一部分线程先获得 A，再获得 B，后释放 B， 再释放 A
另一部分线程先获得 B，再获得 A，后释放 A， 再释放 B

A B 分别在两个线程被获得时，互相等待，造成死锁

```python
import threading

lock_a = threading.Lock()
lock_b = threading.Lock()


class TestThread1(threading.Thread):
    def run(self):
        lock_a.acquire()
        print("%s TestThread1 acquire lock_a" % self.name)
        lock_b.acquire()
        print("%s TestThread1 acquire lock_b" % self.name)
        lock_b.release()
        print("%s TestThread1 release lock_b" % self.name)
        lock_a.release()
        print("%s TestThread1 release lock_a" % self.name)


class TestThread2(threading.Thread):
    def run(self):
        lock_b.acquire()
        print("%s TestThread2 acquire lock_b" % self.name)
        lock_a.acquire()
        print("%s TestThread2 acquire lock_a" % self.name)
        lock_a.release()
        print("%s TestThread2 release lock_a" % self.name)
        lock_b.release()
        print("%s TestThread2 release lock_b" % self.name)

for i in range(50):
    t = TestThread1() if i % 2 else TestThread2()
    t.start()

```
