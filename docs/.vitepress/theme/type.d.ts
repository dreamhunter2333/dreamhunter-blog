import matter from "gray-matter";
import { DefaultTheme } from "vitepress";

// 博客文章
export type Post = {
    frontMatter: matter.GrayMatterFile<string> & {
        date: string
        title: string
        description?: string
        categories: string[] | string
        tags: string[]
        featured?: boolean
    }
    groupKey: string
    group: string
    regularPath: string
}

// 开源项目
export type Project = {
    frontMatter: {
        type: 'project'
        title: string
        description: string
        icon?: string
        date: string
        tags: string[]
        github?: string
        demo?: string
        featured?: boolean
    }
    regularPath: string
}

// 工坊作品
export type Workshop = {
    frontMatter: {
        type: 'workshop'
        title: string
        description: string
        icon?: string
        date: string
        tags: string[]
        demo?: string
        featured?: boolean
    }
    regularPath: string
}

// 主页最新作品（项目 + 工坊）
export type RecentWork = (Project & { type: 'project' }) | (Workshop & { type: 'workshop' })

export interface CustomThemeConfig extends DefaultTheme.Config {
    posts: Post[]
    projects: Project[]
    workshops: Workshop[]
    recentWorks: RecentWork[]
    about?: DefaultTheme.TeamMember
}
