import DefaultTheme from 'vitepress/theme'
import { App } from 'vue'
import { NConfigProvider, NImage } from 'naive-ui'

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
        // register global component
        app.component('Tags', Tags);
        app.component('Category', Category);
        app.component('Archives', Archives);
        app.component('Page', Page);
        app.component('About', About);
        app.component('NConfigProvider', NConfigProvider);
        app.component('NImage', NImage);
    }
}
