import path from 'node:path'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import { Feed, FeedOptions } from 'feed'
import { Post, Project, RecentWork, Workshop } from './type'

interface SidebarLink {
    text: string
    link: string
}

interface SidebarCategory {
    text: string
    items: SidebarLink[]
}

interface SidebarGroup {
    text: string
    items: SidebarCategory[]
}

function _normalizeDateForCompare(date?: string) {
    if (!date) return '0000-00-00 00:00:00'
    const trimmed = String(date).trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        return `${trimmed} 00:00:00`
    }
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(trimmed)) {
        return trimmed
    }
    return '0000-00-00 00:00:00'
}

function _compareDate(obj1: Post, obj2: Post) {
    const d1 = _normalizeDateForCompare(obj1.frontMatter.date)
    const d2 = _normalizeDateForCompare(obj2.frontMatter.date)
    if (d1 === d2) return 0
    return d1 < d2 ? 1 : -1
}

export const getCustomConfig = async (
    autoSidebar?: boolean | undefined
): Promise<{
    sidebar?: Record<string, SidebarGroup>,
    posts: Post[]
    projects: Project[]
    workshops: Workshop[]
    recentWorks: RecentWork[]
}> => {
    // 获取博客文章
    const paths: string[] = []
    for await (const file of fs.glob('**/posts/**/*.md', { exclude: (p) => p.includes('node_modules') })) {
        if (!file.includes('README.md')) {
            paths.push(file)
        }
    }
    const posts = await Promise.all(
        paths.map(async (item) => {
            const content = await fs.readFile(item, 'utf-8')
            const { data } = matter(content)
            const groupKey = `/posts/${item.replace("docs/", "").split('/')[1]}/`
            return {
                frontMatter: data,
                groupKey: groupKey,
                group: item.replace("docs/", "").split('/')[1],
                regularPath: `/${item.replace("docs/", "").replace('.md', '.html')}`
            } as Post
        })
    )
    posts.sort(_compareDate);
    console.log(`\x1b[32m✓\x1b[0m Total ${posts.length} posts found`);

    // 获取项目和工坊
    const projects = await getContentByType('projects') as Project[]
    const workshops = await getContentByType('workshop') as Workshop[]
    const recentWorksList = recentWorks(projects, workshops)

    console.log(`\x1b[32m✓\x1b[0m Total ${projects.length} projects found`);
    console.log(`\x1b[32m✓\x1b[0m Total ${workshops.length} workshop items found`);

    if (!autoSidebar) {
        return { posts, projects, workshops, recentWorks: recentWorksList }
    }

    const sidebar = posts.reduce<Record<string, SidebarGroup>>((acc, cur) => {
        if (!acc[cur.groupKey]) {
            // upcase the first letter
            const groupName = cur.group ? cur.group.charAt(0).toUpperCase() + cur.group.slice(1) : cur.group
            acc[cur.groupKey] = {
                text: groupName,
                items: [{
                    text: groupName,
                    items: []
                }]
            }
        }
        acc[cur.groupKey].items[0].items.push({
            text: cur.frontMatter.title,
            link: cur.regularPath
        })
        return acc
    }, {})
    console.log(`\x1b[32m✓\x1b[0m Auto sidebar generated`);

    return { sidebar, posts, projects, workshops, recentWorks: recentWorksList };
}

// 获取指定类型的内容
export const getContentByType = async (
    type: 'posts' | 'projects' | 'workshop'
): Promise<Post[] | Project[] | Workshop[]> => {
    const paths: string[] = []
    const pattern = `**/${type}/**/*.md`

    for await (const file of fs.glob(pattern, {
        exclude: (p) => p.includes('node_modules')
    })) {
        if (!file.includes('README.md')) {
            paths.push(file)
        }
    }

    const items = await Promise.all(
        paths.map(async (item) => {
            const content = await fs.readFile(item, 'utf-8')
            const { data } = matter(content)

            // 为博客添加 group 信息（兼容现有结构）
            if (type === 'posts') {
                const groupKey = `/posts/${item.replace("docs/", "").split('/')[1]}/`
                return {
                    frontMatter: data,
                    groupKey,
                    group: item.replace("docs/", "").split('/')[1],
                    regularPath: `/${item.replace("docs/", "").replace('.md', '.html')}`
                } as Post
            }

            // 项目和工坊
            return {
                frontMatter: data,
                regularPath: `/${item.replace("docs/", "").replace('.md', '.html')}`
            } as Project | Workshop
        })
    )

    // 按日期排序
    items.sort((a, b) => {
        const d1 = new Date(a.frontMatter.date || 0)
        const d2 = new Date(b.frontMatter.date || 0)
        return d2.getTime() - d1.getTime()
    })

    return items
}

export const recentWorks = (projects: Project[], workshops: Workshop[]): RecentWork[] => {
    const allWorks: RecentWork[] = [
        ...projects.map((project) => ({ ...project, type: 'project' as const })),
        ...workshops.map((workshop) => ({ ...workshop, type: 'workshop' as const }))
    ]

    allWorks.sort((a, b) => {
        const dateA = new Date(a.frontMatter.date || 0).getTime()
        const dateB = new Date(b.frontMatter.date || 0).getTime()
        return dateB - dateA
    })

    return allWorks.slice(0, 3)
}

export const generateRSS = async (hostname: string, posts: Post[], feedOptions: FeedOptions, outDir: string) => {
    if (outDir && feedOptions) {

        const rssPath = path.join(outDir || './.vitepress/dist', 'rss.xml');
        const feed = new Feed(feedOptions);
        posts.forEach((post) => {
            feed.addItem({
                title: post.frontMatter.title,
                id: `${hostname}${post.regularPath}`,
                link: `${hostname}${post.regularPath}`,
                content: post.frontMatter.content,
                date: new Date(post.frontMatter.date)
            });
        })
        await fs.writeFile(rssPath, feed.rss2());
        console.log(`\x1b[32m✓\x1b[0m RSS feed generated`);
    }
}
