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
    themeConfig: {
        type: 'blog',
        smoothScroll: true,
        author: 'Dreamhunter',
        authorAvatar: '/imgs/avatar.jpg',
        // 博客配置
        blogConfig: {
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
                text: 'Category' // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: 'Tag'      // 默认文案 “标签”
            },
            socialLinks: [     // 信息栏展示社交信息
                { icon: 'reco-github', link: 'https://github.com/jinmu333' },
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
        // Git 仓库和编辑链接
        repo: 'https://github.com/jinmu333', // 你的仓库
        repoLabel: 'GitHub', // 导航栏上的文本
        lastUpdated: '上次更新',
        // 项目开始时间，只填写年份
        startYear: '2019'
    },
    plugins: [
        '@vuepress/pwa',
        ['sitemap', {
            hostname: 'https://jcstaff.club'
        }],
    ]
}