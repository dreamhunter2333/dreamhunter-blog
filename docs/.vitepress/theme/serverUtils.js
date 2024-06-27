import { globby } from 'globby'
import matter from 'gray-matter'
import fs from 'fs-extra'

function _convertDate(date = new Date().toString()) {
    const json_date = new Date(date).toJSON()
    return json_date.split('T')[0]
}

function _compareDate(obj1, obj2) {
    return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1
}

export const getThemeConfig = async () => {
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
            }
        })
    )
    posts.sort(_compareDate);
    const sidebar = posts.reduce((acc, cur) => {
        if (!acc[cur.groupKey]) {
            acc[cur.groupKey] = {
                text: cur.group,
                items: [{
                    text: cur.group,
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
    return { posts, sidebar };
}
