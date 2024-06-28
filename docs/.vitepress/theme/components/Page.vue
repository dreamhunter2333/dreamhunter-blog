<template>
    <ClientOnly>
        <n-config-provider :theme="naiveTheme">
            <n-global-style />
            <n-grid style="width: 100%;" :cols="showSide ? 4 : 3">
                <n-gi :span="3">
                    <n-card tag="a" :href="withBase(article.regularPath)" hoverable embedded :bordered="false"
                        v-for="(article, index) in curPosts" :key="index" style="margin-bottom: 10px;">
                        <n-h4>
                            <a :href="withBase(article.regularPath)" strong>
                                {{ article.frontMatter.title }}
                            </a>
                        </n-h4>
                        <n-space>
                            <n-tag :bordered="false">
                                <template #icon>
                                    <n-icon size="15" :component="Clock" />
                                </template>
                                {{ article.frontMatter.date }}
                            </n-tag>
                            <a v-for="(item, index2) in article.frontMatter.tags" v-bind:key="index2"
                                :href="withBase(`/pages/tags.html?tag=${item}`)">
                                <n-tag :bordered="false" strong class="hover-pointer" type="info">
                                    <span>{{ item }}</span>
                                    <template #icon>
                                        <n-icon size="15" :component="Tag" />
                                    </template>
                                </n-tag>
                            </a>
                        </n-space>
                    </n-card>
                    <n-flex justify="center">
                        <n-pagination v-model:page="pageNum" :page-count="pageCount" simple />
                    </n-flex>
                </n-gi>
                <n-gi v-if="showSide" style="width: 100%; margin: 20px; margin-top: 0;">
                    <About />
                    <n-card hoverable embedded :bordered="false" style=" width: 100%; margin-top: 20px;">
                        <n-flex justify="space-around" size="large">
                            <n-statistic label="Posts" :value="posts.length" />
                            <n-statistic label="Tags" :value="tags.length" />
                        </n-flex>
                    </n-card>
                </n-gi>
            </n-grid>
        </n-config-provider>
        <SakanaWidgetPlugin v-if="!isMobile" />
    </ClientOnly>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import {
    NCard, NConfigProvider, darkTheme, NTag, NSpace, NH4,
    NPagination, NStatistic, NFlex, NGrid, NGi, NIcon, NGlobalStyle
} from "naive-ui";
import { Tag, Clock } from '@vicons/fa'
import { useData, withBase } from 'vitepress'
import { useIsMobile } from '../utils/composables'
import { CustomThemeConfig, Post } from '../type';
// @ts-ignore
import About from './About.vue'
// @ts-ignore
import SakanaWidgetPlugin from './SakanaWidgetPlugin.vue';

const isMobile = useIsMobile()
const { isDark, theme } = useData<CustomThemeConfig>()

const showSide = computed(() => !isMobile.value && theme.value.about)

const posts = theme.value.posts;
const tags = theme.value.posts.map(
    (item: Post) => item.frontMatter.tags
).flat().filter(
    (item, index, arr) => arr.indexOf(item) === index
);

const pageSize = 10;
const pageNum = ref(1);
const pageCount = computed(() => Math.ceil(posts.length / pageSize))
const curPosts = computed(() =>
    posts.slice(pageSize * (pageNum.value - 1), pageSize * pageNum.value)
)

const naiveTheme = computed(() => isDark.value ? darkTheme : null)

onBeforeMount(async () => {
    // @ts-ignore
    const { registerSW } = await import('virtual:pwa-register');
    registerSW({ immediate: true });
})
</script>

<style scoped>
a {
    color: var(--vp-c-text-1);
    text-decoration: none;
}
</style>
