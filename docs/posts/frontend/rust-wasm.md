---
title: 年轻人的第一个 Rust WebAssembly 项目 for Vue and Cloudflare Workers
date: '2024-05-04 13:57:23'
categories:
    - frontend
tags:
    - frontend
    - rust
    - wasm
    - cloudflare
---

# 年轻人的第一个 Rust WebAssembly 项目 for Vue and Cloudflare Workers

## npm 包

这里是基于 `Rust WebAssembly` 编写的 `mail-parser` npm 包，分别支持 `Vue` 和 `Cloudflare Workers`

- [mail-parser-wasm](https://www.npmjs.com/package/mail-parser-wasm)
- [mail-parser-wasm-worker](https://www.npmjs.com/package/mail-parser-wasm-worker)

## 背景

去年基于 cloudflare 做了个临时邮箱服务，[dreamhunter2333/cloudflare_temp_email](https://github.com/dreamhunter2333/cloudflare_temp_email)

尝试了一些 `node` 生态的 mail 解析库，总有大大小小的问题(`mail-parser`/`postal-mime`)

所以想尝试一下 `Rust WebAssembly` 来解析邮件

## 开发步骤

> 开发环境: macOS

跟着官方文档走，[Rust and WebAssembly](https://rustwasm.github.io/book/)

### 安装 `rustup` 和 `wasm-pack`

```bash
brew install rustup-init
rustup-init
cargo install wasm-pack
```

### 创建项目

源码: [mail-parser-wasm](https://github.com/dreamhunter2333/cloudflare_temp_email/tree/main/mail-parser-wasm)

```bash
cargo new --lib mail-parser-wasm
cd mail-parser-wasm
```

只需要编写一个 `src/lib.rs` 文件即可

### 编译并发布

对于 `Vue` 项目，直接使用下面命令即可

```bash
wasm-pack build --release
# 发布
# wasm-pack publish
```

### 为 `Cloudflare Workers` 项目编译

参考下面的命令，在 [mail-parser-wasm/worker](https://github.com/dreamhunter2333/cloudflare_temp_email/tree/main/mail-parser-wasm/worker) 目录中，我为 `Cloudflare Workers` 做了特殊处理

编译 web 版本的产出到 web 目录，然后将除了 json 文件和 gitignore 文件之外的文件拷贝到 worker 目录，此时 worker 目录就是最终的产出，可以在 `Cloudflare Workers` 项目中直接使用。

```bash
wasm-pack build --out-dir web --target web --release
find web/ -type f ! -name '*.json' ! -name '.gitignore' -exec cp {} worker/ \;
# 发布
# pnpm publish worker --no-git-checks
```
