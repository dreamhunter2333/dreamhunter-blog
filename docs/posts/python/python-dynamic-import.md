---
title: Python Dynamic Import
date: '2021-05-04 16:39:49'
categories:
    - python
tags:
    - python
---

# Python Dynamic Import

## 动态导包

```python
import os
import sys
import importlib
import importlib.util

# 启动时加载包列表上层包
PATH = "xxx"
if PATH:
    spec = importlib.util.spec_from_file_location("xxx", os.path.join(PATH, "__init__.py"))
    xxx_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(xxx_module)
    sys.modules["xxx"] = xxx_module


def reload_module(self, module_name):
    """
    动态导入并热加载模块包
    """
    module_path = '.'.join(["xxx", module_name])
    if module_path in sys.modules:
        del sys.modules[module_path]
    module = importlib.import_module(module_path)
    sys.modules[module_path] = module
```
