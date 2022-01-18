---
title: git commit --amend --date
date: '2020-04-16 15:37:47'
categories: git
tags:
    - git
---

## git commit --amend --date=

添加 `GIT_COMMITTER_DATE="Tue, 18 Jan 2022 19:07:14 +0800"` 修改 commit 时间

```bash
# 修改上一次 commit 时间为当前
git commit --amend --date="$(date -R)"
# 修改上一次 commit 时间
git commit --amend --date="Thu, 16 Apr 2020 15:44:13 +0800"
```
