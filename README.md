# Dream Hunter's Blog

个人博客站点，基于 VitePress 构建并做了主题定制，提供文章列表、分类、标签、归档、评论与互动等功能。

## 特性
- VitePress 驱动的文档/博客站点
- 自定义主题与布局
- 文章归档、分类、标签页
- 评论系统（Giscus）
- 交互组件（Naive UI、Sakana）

## 技术栈
- `vitepress`
- `naive-ui`
- `sakana`
- `giscus`

## 开发与构建
```bash
pnpm dev        # 本地开发
pnpm build      # 构建产物
pnpm preview    # 预览构建产物
pnpm lint       # 主题代码格式检查
pnpm new -- ... # 创建新文章（交互式或指定参数）
```

## 目录结构
```
docs/
  .vitepress/         # 站点配置与主题
  posts/              # 文章内容
  pages/              # 页面（分类、标签、归档等）
  public/             # 静态资源
scripts/              # 工具脚本（如新建文章）
```

## 新建文章
```
pnpm new
# 或
pnpm new -- 分类 "标题" [slug]
```
