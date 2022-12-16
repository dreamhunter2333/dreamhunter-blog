---
title: 爱奇艺弹幕 下载 解析 转换
date: '2022-04-03 16:50:34'
categories:
    - other
tags:
    - other
---

开源地址 [iqiyi_danmu](https://github.com/dreamhunter2333/iqiyi_danmu)

## 前言

- 一种压缩格式 [brotli](https://github.com/google/brotli)
- 序列化工具 [protobuf](https://developers.google.com/protocol-buffers/)

## 开工

最近看了热播剧《猎罪图鉴》，打开网页版爱奇艺播放，F12

![F12](/imgs/iqiyi-danmu/F12.png)

可以看到弹幕的请求是这样的 `https://cmts.iqiyi.com/bullet/67/00/6265416625426700_60_2_3795ee87.br`

查看 `initiator` 分析 js 可知，数据为 `brotli` 压缩格式，解压后使用 `protobuf` 反序列化

![initiator](/imgs/iqiyi-danmu/initiator.png)

![br2Object](/imgs/iqiyi-danmu/br2Object.png)

然后我们可以看到 `Danmu` 对象的 `protobuf` 构造

![proto-danmu](/imgs/iqiyi-danmu/proto-danmu.png)

## 开始解析

为了简单，选用 python 进行解析，下载之前的 br 链接的文件

### 安装 `brotli` 库 进行解压

新建 `main.py` 编写解压代码

解压后是 protobuf 的二进制格式，我们无法直接读取

```python
import brotli


with open("6265416625426700_60_2_3795ee87.br", "rb") as f:
    out = brotli.decompress(bytearray(f.read()))
```

### 编写 proto 文件

我们只需要添加弹幕相关的字段，新建 `danmu.proto` 如下

```proto
syntax = "proto2";
package danmu;

message BulletInfo {
    optional string content = 2; // becomes awesomeField
}

message Entry {
    repeated BulletInfo bulletInfo = 2; // becomes awesomeField
}

message Danmu {
    repeated Entry entry = 6; // becomes awesomeField
}
```

### 解析弹幕

终端运行下面的命令，转换为 `Python` 代码文件 `danmu_pb2.py`

```bash
protoc --python_out=. *.proto
```

然后我们修改下之前的 `main.py`, 现在就可以输出弹幕内容啦

```python
import brotli
import danmu_pb2


with open("6265416625426700_60_2_3795ee87.br", "rb") as f:
    out = brotli.decompress(bytearray(f.read()))
    danmu = danmu_pb2.Danmu()
    danmu.ParseFromString(out)
    print([
        bulletInfo.content
        for entry in danmu.entry
        for bulletInfo in entry.bulletInfo
    ])
```

## 制作词云图

```python
wc = WordCloud(
    background_color=background_color,
    max_words=max_words,
    stopwords=STOPWORDS,
    font_path=font_path,
    width=width, height=height
).generate(" ".join(danmu_data))
wc.to_file(f"{outpath}")
```

![wordcloud](/imgs/iqiyi-danmu/wordcloud.jpg)
