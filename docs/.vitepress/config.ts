import { SiteConfig, defineConfig } from 'vitepress'
import { getCustomConfig, generateRSS } from './theme/serverUtils'
import { CustomThemeConfig } from './theme/type'

export default defineConfig<CustomThemeConfig>({
    lang: 'zh-CN',
    ignoreDeadLinks: true,
    title: 'Dreamhunter Blog',
    description: '你指尖跃动的电光，是我此生不变的信仰',
    vite: {
        ssr: { noExternal: ['naive-ui'] }
    },
    head: [
        ['link', { rel: 'icon', href: '/imgs/favicon.ico' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
        ['link', { rel: 'apple-touch-icon', href: '/imgs/avatar.png' }],
    ],
    buildEnd: async (siteConfig: SiteConfig<CustomThemeConfig>) => {
        await generateRSS(
            'https://dreamhunter2333.com',
            siteConfig.site?.themeConfig?.posts || [],
            {
                id: 'https://dreamhunter2333.com',
                title: 'Dreamhunter Blog',
                description: 'Dreamhunter Blog',
                link: 'https://dreamhunter2333.com',
                copyright: `Copyright © 2019-${new Date().getFullYear()} DreamHunter`,
            },
            siteConfig.outDir
        )
    },
    themeConfig: {
        ...await getCustomConfig(),
        about: {
            avatar: 'https://www.github.com/dreamhunter2333.png',
            name: 'dreamhunter2333',
            links: [
                { icon: 'github', link: 'https://github.com/dreamhunter2333' },
                { icon: 'twitter', link: 'https://twitter.com/dreamhunter2333' }
            ]
        },
        nav: [
            { text: '首页', link: '/' },
            { text: '分类', link: '/pages/category' },
            { text: '标签', link: '/pages/tags' },
            { text: '归档', link: '/pages/archives' },
            { text: '留言', link: '/pages/about' }
        ],
        search: {
            provider: 'local',
        },
        outline: {
            label: '页面导航'
        },
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },

        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        socialLinks: [
            {
                icon: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"><path d="M128.081 415.959c0 35.369-28.672 64.041-64.041 64.041S0 451.328 0 415.959s28.672-64.041 64.041-64.041s64.04 28.673 64.04 64.041zm175.66 47.25c-8.354-154.6-132.185-278.587-286.95-286.95C7.656 175.765 0 183.105 0 192.253v48.069c0 8.415 6.49 15.472 14.887 16.018c111.832 7.284 201.473 96.702 208.772 208.772c.547 8.397 7.604 14.887 16.018 14.887h48.069c9.149.001 16.489-7.655 15.995-16.79zm144.249.288C439.596 229.677 251.465 40.445 16.503 32.01C7.473 31.686 0 38.981 0 48.016v48.068c0 8.625 6.835 15.645 15.453 15.999c191.179 7.839 344.627 161.316 352.465 352.465c.353 8.618 7.373 15.453 15.999 15.453h48.068c9.034-.001 16.329-7.474 16.005-16.504z" fill="currentColor"></path></svg>'
                },
                link: '/rss.xml',
                ariaLabel: 'Rss'
            },
            { icon: 'twitter', link: 'https://twitter.com/dreamhunter2333', ariaLabel: 'Twitter' },
            { icon: 'github', link: 'https://github.com/dreamhunter2333', ariaLabel: 'Github' }
        ],
        docFooter: {
            prev: false,
            next: false
        },
        footer: {
            copyright: `Copyright © 2019-${new Date().getFullYear()} DreamHunter`
        },
    },
    sitemap: {
        hostname: 'https://dreamhunter2333.com'
    },
})
