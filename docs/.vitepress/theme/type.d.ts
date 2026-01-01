import matter from "gray-matter";
import { DefaultTheme } from "vitepress";

// 标签颜色类型
export type TagColorType = 'info' | 'success' | 'warning' | 'error'

export type Post = {
    frontMatter: matter.GrayMatterFile<string> & {
        date: string, title: string,
        categories: string[] | string,
        tags: string[]
    }
    groupKey: string
    group: string
    regularPath: string
}

export interface CustomThemeConfig extends DefaultTheme.Config {
    posts: Post[],
    about?: DefaultTheme.TeamMember
}
