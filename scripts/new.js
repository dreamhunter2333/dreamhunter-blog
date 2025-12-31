#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import { input, select } from '@inquirer/prompts'

const usage = () => {
  console.log('用法: pnpm new -- <category> <title> [slug]')
  console.log('可选交互: pnpm new -- --select <title> [slug]')
  console.log('直接运行: pnpm new')
  console.log('示例: pnpm new -- 编程 "一次 VitePress 优化"')
}

const args = process.argv.slice(2)
if (args.length > 3) {
  usage()
  process.exit(1)
}

const getCategories = async () => {
  try {
    const dir = path.join('docs', 'posts')
    const entries = await fs.readdir(dir, { withFileTypes: true })
    return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort()
  } catch {
    return []
  }
}

const pickCategory = async () => {
  const categories = await getCategories()
  if (categories.length === 0) {
    return await input({
      message: '当前没有分类，请输入新分类名称:',
      validate: (value) => (value ? true : '分类名称不能为空'),
    })
  }
  const choice = await select({
    message: '选择分类',
    choices: [
      ...categories.map((c) => ({ name: c, value: c })),
      { name: '新增分类', value: '__NEW__' },
    ],
  })
  if (choice === '__NEW__') {
    return await input({
      message: '请输入新分类名称:',
      validate: (value) => (value ? true : '分类名称不能为空'),
    })
  }
  return choice
}

let category
let title
let maybeSlug

if (args.length === 0) {
  category = await pickCategory()
  title = await input({
    message: '请输入标题:',
    validate: (value) => (value ? true : '标题不能为空'),
  })
} else if (args[0] === '--select') {
  if (args.length < 2 || args.length > 3) {
    usage()
    process.exit(1)
  }
  category = await pickCategory()
  title = args[1]
  maybeSlug = args[2]
} else if (args.length === 1) {
  category = await pickCategory()
  title = args[0]
} else {
  ;[category, title, maybeSlug] = args
}

if (!category || !title) {
  usage()
  process.exit(1)
}

const slugify = (input) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const pad2 = (n) => String(n).padStart(2, '0')
const now = new Date()
const timestampSlug = `${now.getFullYear()}${pad2(now.getMonth() + 1)}${pad2(now.getDate())}-${pad2(
  now.getHours()
)}${pad2(now.getMinutes())}${pad2(now.getSeconds())}`

const slug = maybeSlug?.trim() || slugify(title) || timestampSlug
const postDir = path.join('docs', 'posts', category)
const postFile = path.join(postDir, `${slug}.md`)

await fs.mkdir(postDir, { recursive: true })

try {
  await fs.access(postFile)
  console.error(`已存在: ${postFile}`)
  process.exit(1)
} catch {
  // ok
}

const frontMatter = `---
title: ${title}
date: '${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())} ${pad2(
  now.getHours()
)}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}'
categories:
  - ${category}
tags:
  - ${category}
---

`

await fs.writeFile(postFile, frontMatter, 'utf8')
console.log(`已创建: ${postFile}`)
