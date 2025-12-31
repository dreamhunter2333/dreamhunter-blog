import path from 'node:path'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import { Feed, FeedOptions } from 'feed'
import { Post } from './type'

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
}> => {
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

    if (!autoSidebar) {
        return { posts }
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

    return { sidebar, posts };
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
