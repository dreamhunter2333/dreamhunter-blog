---
title: intall and use yarn
date: '2020-06-21 16:22:25'
categories: front
tags:
    - yarn
---

# intall and use yarn

## 安装 使用 yarn

### macos

```bash
brew install yarn
```

### linux

```bash
apt-get install gnupg -y
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt-get update -y && apt-get upgrade -y
apt-get install yarn -y
```
