import DefaultTheme from 'vitepress/theme'
import { App } from 'vue'
import mediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute, useData } from 'vitepress'

import NewLayout from './components/NewLayout.vue'
import Archives from './components/Archives.vue'
import Category from './components/Category.vue'
import Tags from './components/Tags.vue'
import Page from './components/Page.vue'
import About from './components/About.vue'
import "./custom.css"

export default {
    ...DefaultTheme,
    Layout: NewLayout,
    enhanceApp({ app }: { app: App }) {
        // register global components
        app.component('Tags', Tags)
        app.component('Category', Category)
        app.component('Archives', Archives)
        app.component('Page', Page)
        app.component('About', About)
    },
    setup() {
        const route = useRoute()
        const { frontmatter } = useData()
        const initZoom = () => {
            // 检查 frontmatter 是否禁用了图片缩放
            const zoomDisabled = frontmatter.value.imageZoom === false

            if (zoomDisabled) {
                // 移除这些页面图片的放大镜光标
                const images = document.querySelectorAll('.vp-doc img')
                images.forEach(img => {
                    (img as HTMLElement).style.cursor = 'default'
                })
                return
            }
            mediumZoom('.vp-doc img', {
                background: 'var(--vp-c-bg)',
                margin: 24
            })
        }
        onMounted(() => {
            initZoom()
        })
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        )
    }
}
