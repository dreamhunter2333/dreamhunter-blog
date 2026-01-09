import { SiteConfig, defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { withPwa } from '@vite-pwa/vitepress'
import { getCustomConfig, generateRSS } from './theme/serverUtils'
import { CustomThemeConfig } from './theme/type'

export default withPwa(withMermaid(defineConfig<CustomThemeConfig>({
    lang: 'zh-CN',
    ignoreDeadLinks: true,
    title: 'Dreamhunter Blog',
    description: '你指尖跃动的电光，是我此生不变的信仰',
    vite: {
        ssr: { noExternal: ['naive-ui', 'mermaid', 'vitepress-plugin-mermaid'] },
        optimizeDeps: { include: ['mermaid', 'dayjs'] }
    },
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
        ['link', { rel: 'apple-touch-icon', href: '/imgs/avatar.png' }],
        ['meta', { name: 'theme-color', content: '#F8F8F8', media: '(prefers-color-scheme: light)' }],
        ['meta', { name: 'theme-color', content: '#1A1A1A', media: '(prefers-color-scheme: dark)' }],
        // 防止页面刷新白屏闪烁 - 立即设置背景色和主题
        ['script', {}, `
            (function() {
                const theme = localStorage.getItem('vitepress-theme-appearance') || 'auto';
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = theme === 'dark' || (theme === 'auto' && prefersDark);
                if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.backgroundColor = '#1A1A1A';
                } else {
                    document.documentElement.style.backgroundColor = '#F8F8F8';
                }
            })();
        `],
        ['style', {}, `
            html { background-color: #F8F8F8; }
            html.dark { background-color: #1A1A1A; }
        `]
    ],
    pwa: {
        registerType: 'autoUpdate',
        devOptions: {
            enabled: true
        },
        workbox: {
            globPatterns: [],
            navigateFallbackDenylist: [/\.xml$/],
            disableDevLogs: true
        },
        manifest: {
            name: 'Dreamhunter Blog',
            short_name: 'DH Blog',
            description: '你指尖跃动的电光，是我此生不变的信仰',
            theme_color: '#F8F8F8',
            background_color: '#F8F8F8',
            display: 'standalone',
            icons: [
                {
                    src: '/imgs/avatar.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: '/imgs/avatar.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ]
        }
    },
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
            avatar: '/imgs/avatar.png',
            name: 'Dream Hunter',
            links: [
                { icon: 'github', link: 'https://github.com/dreamhunter2333' },
                { icon: 'twitter', link: 'https://twitter.com/dreamhunter2333' }
            ]
        },
        nav: [
            { text: '首页', link: '/' },
            { text: '博客', link: '/pages/posts' },
            { text: '项目', link: '/pages/projects' },
            { text: '工坊', link: '/pages/workshop' },
            { text: '关于', link: '/pages/about' }
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
})))
