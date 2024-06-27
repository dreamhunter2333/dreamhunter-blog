import { Post } from "./type"

export function initTags(post: Post[]) {
    const data: any = {}
    for (let index = 0; index < post.length; index++) {
        const element = post[index]
        const tags = element.frontMatter.tags
        if (tags) {
            tags.forEach((item) => {
                if (data[item]) {
                    data[item].push(element)
                } else {
                    data[item] = []
                    data[item].push(element)
                }
            })
        }
    }
    return data
}

export function initCategory(post: Post[]) {
    const data: any = {}
    for (let index = 0; index < post.length; index++) {
        const element = post[index]
        const categories = element.frontMatter.categories
        if (categories) {
            if (Array.isArray(categories)) {
                categories.forEach((item) => {
                    if (!data[item]) {
                        data[item] = []
                    }
                    data[item].push(element)
                })
            } else {
                if (!data[categories]) {
                    data[categories] = []
                }
                data[categories].push(element)
            }
        }
    }
    return data
}
