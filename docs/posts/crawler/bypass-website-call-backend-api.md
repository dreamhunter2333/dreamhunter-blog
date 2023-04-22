---
title: 一种基于浏览器，绕过各种限制的调用网站后台 api 的方法
date: '2023-04-22 22:08:27'
categories:
    - crawler
tags:
    - crawler
---

## 通过 Chrome DevTools Protocol 在控制台执行 js

利用其实现 openai 的网页 api 反向代理

[chatgpt_reverse_proxy](https://github.com/dreamhunter2333/chatgpt_reverse_proxy)

![overview](https://github.com/dreamhunter2333/chatgpt_reverse_proxy/blob/main/overview.png)

```python
await page.evaluate('''
    async () => {
        response = await fetch("https://chat.openai.com%s", {
            "headers": {
                "accept": "*/*",
                "authorization": "%s",
                "content-type": "application/json",
            },
            "referrer": "https://chat.openai.com/",
            "referrerPolicy": "same-origin",
            "body": %s,
            "method": "%s",
            "mode": "cors",
            "credentials": "include"
        });
        return {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            content: await response.text()
        }
    }
    ''' % (target_path, access_token, body, request.method.upper())
)
```
