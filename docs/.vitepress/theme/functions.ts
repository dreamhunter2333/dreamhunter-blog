type Post = {
    frontMatter: {
        date: string
        title: string
        categories: string[]
        tags: string[]
        description: string
    }
    regularPath: string
}

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

export function useYearSort(post: Post[]) {
    const data = []
    let year = '0'
    let num = -1
    for (let index = 0; index < post.length; index++) {
        const element = post[index]
        if (element.frontMatter.date) {
            const y = element.frontMatter.date.split('-')[0]
            if (y === year) {
                data[num].push(element)
            } else {
                num++
                data[num] = [] as any
                data[num].push(element)
                year = y
            }
        }
    }
    return data
}
