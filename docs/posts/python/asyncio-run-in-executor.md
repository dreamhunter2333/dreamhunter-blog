---
title: asyncio run in executor
date: '2021-01-05 21:37:13'
categories: python
tags: 
    - python
---

# asyncio run in executor

## asyncio run in executor

demo 如下，运行需要 2s
将 asyncio.sleep(2) 改成  time.sleep(2) 再次运行，异步的程序需要4s了，这是异步嘛？
sleep会阻塞线程，所以协程就不会异步

```python
import time
import asyncio
 
 
async def long_blocking_function():
    # time.sleep(2)
    await asyncio.sleep(2)
    return True
 
async def run():
    tasks = [long_blocking_function(), long_blocking_function()]
    return await asyncio.gather(*tasks)
 
if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    now = time.time()
    loop.run_until_complete(run())
    print(time.time() - now)
```

修改代码如下，再次运行，程序运行结束再次只需要 2s了

```python
import asyncio
import time
 
from concurrent.futures import ThreadPoolExecutor
 
 
def long_blocking_function():
    time.sleep(2)
    return True
 
 
async def run():
    loop = asyncio.get_event_loop()
    # 新建线程池
    pool = ThreadPoolExecutor()
    # 任务列表
    tasks = [loop.run_in_executor(pool, long_blocking_function), loop.run_in_executor(pool, long_blocking_function)]
 
    # 等待所有任务结束并返回
    return await asyncio.gather(*tasks)
 
 
if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    now = time.time()
    loop.run_until_complete(run())
    print(time.time() - now)
```
