module.exports = {
    title: 'Dreamhunter Blog',
    description: '你指尖跃动的电光，是我此生不变的信仰',
    head: [
        ['link', { rel: 'icon', href: '/imgs/favicon.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/imgs/avatar.jpg' }],
        ['link', { rel: 'mask-icon', href: '/imgs/avatar.jpg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/imgs/avatar.jpg' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    logo: '/imgs/header_image.jpg',
    theme: 'reco',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    themeConfig: {
        type: 'blog',
        smoothScroll: true,
        author: 'Dreamhunter',
        authorAvatar: '/imgs/avatar.jpg',
        // 博客配置
        blogConfig: {
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
                // text: 'Category' // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                // text: 'Tag'      // 默认文案 “标签”
            },
            socialLinks: [     // 信息栏展示社交信息
                { icon: 'reco-github', link: 'https://github.com/jinmu333' },
                { icon: 'reco-bilibili', link: 'https://space.bilibili.com/18153635' }
            ]
        },
        // 顶部导航
        nav: [
            { text: '首页', link: '/' },
            { text: '归档', link: '/timeline/', icon: 'reco-date' },
        ],
        valineConfig: {
            appId: 'QJzEVotcqV9aroPLqAbEb6pt-gzGzoHsz',
            appKey: 'eDC4ScXwCucfXCjKPk0ul8z4'
        },
        subSidebar: 'auto',
        sidebar: 'auto',
        // Git 仓库和编辑链接
        repo: 'https://github.com/jinmu333', // 你的仓库
        repoLabel: 'GitHub', // 导航栏上的文本
        lastUpdated: '上次更新',
        // 备案
        record: '鲁ICP备2021007677号',
        recordLink: 'http://beian.miit.gov.cn/',
        //         cyberSecurityRecord: '公安部备案文案',
        //         cyberSecurityLink: '公安部备案指向链接',
        // 项目开始时间，只填写年份
        startYear: '2019'
    },
    plugins: [
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: {
                message: "发现新内容可用",
                buttonText: "刷新"
            }
        }],
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang, dateOptions) => {
                    return new Date(timestamp).toLocaleString("en-US", dateOptions)
                }
            }
        ],
        ['sitemap', {
            hostname: 'https://jcstaff.club'
        }],
        ["vuepress-plugin-auto-sidebar", {}],
        ['vuepress-plugin-helper-live2d', {
            // 是否开启控制台日志打印(default: false)
            log: false,
            live2d: {
                // 是否启用(关闭请设置为false)(default: true)
                enable: true,
                // 模型名称(default: hibiki)>>>取值请参考：
                // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
                model: 'koharu',
                display: {
                    position: "left", // 显示位置：left/right(default: 'right')
                    width: 135, // 模型的长度(default: 135)
                    height: 300, // 模型的高度(default: 300)
                    hOffset: 10, //  水平偏移(default: 65)
                    vOffset: 0, //  垂直偏移(default: 0)
                },
                mobile: {
                    show: false // 是否在移动设备上显示(default: false)
                },
                react: {
                    opacity: 1 // 模型透明度(default: 0.8)
                }
            }
        }]
    ]
}
