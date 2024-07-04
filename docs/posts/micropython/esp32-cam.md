---
title: 为 ESP32-CAM 编译支持 camera 的 MicroPython 固件
date: '2024-07-04 11:08:13'
categories:
    - micropython
tags:
    - micropython
---

# 为 ESP32-CAM 编译支持 camera 的 MicroPython 固件

![esp32-cam](/imgs/micropython/esp32-cam.png)

最近买了几个 `ESP32` 开发板，刷了 `MicroPython` 固件，体验下来非常好，但是 `ESP32-CAM` 的 `MicroPython` 固件不支持 `camera` 模块，所以就自己编译了一个支持 `camera` 的 `MicroPython` 固件。

于是一番搜索，找到了一个支持 `camera` 的 `MicroPython` 的仓库: [lemariva/micropython-camera-driver](https://github.com/lemariva/micropython-camera-driver)

我参考这个仓库的 `README` 编译了一个支持 `camera OV5640` 的最新版 `MicroPython` 固件。

## 编译环境

- 操作系统: `Ubuntu 20.04` 我使用了 `WSL2` 编译
- `ESP-IDF` 版本: `v5.0.4`
- [espressif/esp32-camera](https://github.com/espressif/esp32-camera): 最新版
- [micropython/micropython](https://github.com/micropython/micropython): 最新版

## 编译步骤

参考 [esp32/README.md](https://github.com/micropython/micropython/blob/master/ports/esp32/README.md)

```bash
mkdir esp32-src && cd esp32-src
# 下载 lemariva/micropython-camera-driver
git clone https://github.com/lemariva/micropython-camera-driver.git
# 下载 esp-idf
git clone -b v5.0.4 --recursive https://github.com/espressif/esp-idf.git
cd esp-idf/components
# 下载 esp32-camera
git clone https://github.com/espressif/esp32-camera.git
cd ..
# 安装依赖
./install.sh
# 设置环境变量
source export.sh
# 切换到 esp32-src 目录
cd ..
# 复制 micropython-camera-driver/boards/ESP32_CAM 到 micropython/ports/esp32/boards
cp micropython-camera-driver/boards/ESP32_CAM micropython/ports/esp32/boards/ESP32_CAM
# 切换到 micropython esp32 目录
cd micropython/ports/esp32
# 初始化 submodules
make submodules
# 编译
make USER_C_MODULES=../../../../micropython-camera-driver/src/micropython.cmake BOARD=ESP32_CAM all
```

## 进阶修改

此时应该会遇到一个错误: `STATIC` 关键词不存在，到 micropython-camera-driver 目录，搜索 `STATIC` 替换为 `static`，然后重新编译。

```bash
make USER_C_MODULES=../../../../micropython-camera-driver/src/micropython.cmake BOARD=ESP32_CAM all
```

如果是为 `OV5640` 或者其他摄像头编译，可以修改 `micropython-camera-driver/boards/ESP32_CAM/sdkconfig.esp32cam` 文件，修改 `CONFIG_OV2640_SUPPORT=y` 为 `CONFIG_OV5640_SUPPORT=y`，然后重新编译。

编译完成后，会在 `build-ESP32-CAM` 目录生成 `firmware.bin` 文件，这个文件就是编译好的 `MicroPython` 固件。

## 烧录固件

使用 `esptool.py` 或者 `Thonny` 烧录固件。

## 编写测试代码

写到 `main.py` 文件中, 重启执行测试即可。

```python
import camera
camera.init(0, format=camera.JPEG, fb_location=camera.PSRAM)
camera.mirror(1)
# buf 是 bytes 的图片，可以直接保存到文件或者通过 http 返回
buf = camera.capture()
```
