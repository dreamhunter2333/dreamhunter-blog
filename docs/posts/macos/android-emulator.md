---
title: android emulator
date: '2021-12-15 23:40:35'
categories:
    - macos
tags:
    - macos
    - android
    - emulator
---

# android emulator

[download Command line tools](https://developer.android.com/studio#downloads)

```bash
mkdir android-sdk
mkdir android-sdk/cmdline-tools
mkdir android-sdk/cmdline-tools/latest
cd android-sdk/cmdline-tools/latest
unzip commandlinetools-xxx-xxx_latest.zip

# download sdk
export ANDROID_SDK_ROOT=<path>/android-sdk
./bin/sdkmanager "system-images;android-31;google_apis;x86_64"
./bin/sdkmanager "platform-tools"

# create avd
./bin/avdmanager create avd --name "android-12" -k "system-images;android-31;google_apis;x86_64"  -p <path>/avd-12

# run
./emulator/emulator -avd android-12
```
