import { defineConfigWithTheme } from 'vitepress'
import { getCustomConfig } from './theme/serverUtils'
import { withPwa } from '@vite-pwa/vitepress'
import { CustomThemeConfig } from './theme/type'

export default withPwa(defineConfigWithTheme<CustomThemeConfig>({
    pwa: {
        registerType: 'autoUpdate',
        devOptions: {
            enabled: true
        },
        manifest: {
            name: 'Dreamhunter Blog',
            short_name: 'Dreamhunter Blog',
            description: 'Dreamhunter Blog',
            theme_color: '#ffffff',
            icons: [
                {
                    src: '/imgs/avatar.png',
                    sizes: '192x192',
                    type: 'image/png'
                }
            ]
        }
    },
    sitemap: {
        hostname: 'https://dreamhunter2333.com'
    },
    ignoreDeadLinks: true,
    title: 'Dreamhunter Blog',
    description: '你指尖跃动的电光，是我此生不变的信仰',
    head: [
        ['link', { rel: 'icon', href: '/imgs/favicon.ico' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
        ['link', { rel: 'apple-touch-icon', href: '/imgs/avatar.png' }],
    ],
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
            { icon: 'twitter', link: 'https://twitter.com/dreamhunter2333' },
            { icon: 'github', link: 'https://github.com/dreamhunter2333' }
        ],
        docFooter: {
            prev: false,
            next: false
        },
        footer: {
            copyright: 'Copyright © 2019-至今 DreamHunter'
        },
    }
}))
