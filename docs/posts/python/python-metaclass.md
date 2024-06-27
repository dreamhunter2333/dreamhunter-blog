---
title: Python metaclass
date: '2021-05-04 16:50:49'
categories:
    - python
tags:
    - python
---

# Python metaclass

## 熟悉又陌生的 type

在日常使用中，我们经常使用 object 来派生一个类，事实上，在这种情况下，Python 解释器会调用 type 来创建类。

```python
class Foo(object):
    pass

Foo = type('Foo', (object, ), {})
```

上面两种方式是等价的。我们看到，type 接收三个参数：

- 字符串 'Foo'，表示类名
- 元组 (object, )，表示所有的父类
- 字典，这里是一个空字典，表示没有定义属性和方法

类是实例对象的模板，元类是类的模板

元类的主要目的是为了控制类的创建行为

## 元类的使用

```python
class Metaclass(type):
    def __new__(cls, name, bases, attrs):
        return type.__new__(cls, name, bases, _attrs)

    def __init__(self, name, bases, attrs):
        type.__init__(self, name, bases, attrs)

class Foo(metaclass=Metaclass):
    pass
```

在 Python 中，类也是一个对象, 类创建实例，元类创建类

元类主要做了三件事：

- 拦截类的创建
- 修改类的定义
- 返回修改后的类
