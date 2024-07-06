import { globby } from 'globby'
import path from 'node:path'
import matter from 'gray-matter'
import fs from 'fs-extra'
import { Feed } from 'feed'
import { Post } from './type'
import { FeedOptions } from 'feed'

function _convertDate(date = new Date().toString()) {
    const json_date = new Date(date).toJSON()
    return json_date.split('T')[0]
}

function _compareDate(obj1: Post, obj2: Post) {
    return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1
}

export const getCustomConfig = async (
    autoSidebar?: boolean | undefined
): Promise<{
    sidebar?: Record<string, any>,
    posts: Post[]
}> => {
    const paths = await globby(['**/posts/**/*.md'], {
        ignore: ["node_modules", "README.md"],
    })
    const posts = await Promise.all(
        paths.map(async (item) => {
            const content = await fs.readFile(item, 'utf-8')
            const { data } = matter(content)
            data.date = _convertDate(data.date)
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

    const sidebar = posts.reduce((acc, cur) => {
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
