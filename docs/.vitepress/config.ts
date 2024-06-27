import { defineConfig } from 'vitepress'
import { getThemeConfig } from './theme/serverUtils'

export default defineConfig({
    sitemap: {
        hostname: 'https://notes.dreamhunter2333.com'
    },
    ignoreDeadLinks: true,
    title: 'Dreamhunter Blog',
    description: '你指尖跃动的电光，是我此生不变的信仰',
    head: [
        ['link', { rel: 'icon', href: '/imgs/favicon.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/imgs/avatar.png' }],
        ['link', { rel: 'mask-icon', href: '/imgs/avatar.png', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/imgs/avatar.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    logo: '/imgs/header_image.jpg',
    themeConfig: {
        docFooter: {
            prev: false,
            next: false
        },
        footer: {
            copyright: 'Copyright © 2019-至今 DreamHunter'
        },
        ...await getThemeConfig(),
        teamMembers: [
            {
                avatar: 'https://www.github.com/dreamhunter2333.png',
                name: 'dreamhunter2333',
                links: [
                    { icon: 'github', link: 'https://github.com/dreamhunter2333' },
                    { icon: 'twitter', link: 'https://twitter.com/dreamhunter2333' }
                ]
            }
        ],
        pageSize: 10,
        author: 'Dreamhunter',
        authorAvatar: '/imgs/avatar.png',
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
            { icon: 'twitter', link: 'https://twitter.com/dreamhunter2333' },
            { icon: 'github', link: 'https://github.com/dreamhunter2333' }
        ],
    }
})
