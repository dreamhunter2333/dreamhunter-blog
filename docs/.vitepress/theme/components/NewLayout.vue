<template>
    <Layout>
        <template #doc-before>
            <ClientOnly>
                <n-config-provider :theme="naiveTheme">
                    <n-space v-if="!$frontmatter.page" style="margin: 10px;">
                        <n-tag :bordered="false">
                            {{ $frontmatter.date?.substring(0, 10) }}
                        </n-tag>
                        <a v-for="(item, index2) in $frontmatter.tags" v-bind:key="index2"
                            :href="withBase(`/pages/tags.html?tag=${item}`)">
                            <n-tag :bordered="false" strong class="hover-pointer" type="info">
                                <span>{{ item }}</span>
                            </n-tag>
                        </a>
                    </n-space>
                </n-config-provider>
            </ClientOnly>
        </template>
        <template #doc-after>
            <Giscus id="comments" repo="dreamhunter2333/dreamhunter-blog" repoId="MDEwOlJlcG9zaXRvcnkzMzIyNTA3MTc="
                category="General" categoryId="DIC_kwDOE82-Xc4CgbBf" mapping="pathname" reactionsEnabled="1"
                emitMetadata="0" inputPosition="top" :theme="isDark ? 'dark' : 'light'" lang="zh-CN" loading="lazy" />
        </template>
    </Layout>
</template>
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from "vitepress";
import Giscus from '@giscus/vue';
import {
    NCard, NConfigProvider, darkTheme, NTag,
    NSpace, NH4, NPagination,
    NFlex, NGrid, NGi
} from "naive-ui";
import { computed } from 'vue';
const { isDark } = useData()

const { Layout } = DefaultTheme
const naiveTheme = computed(() => {
    return isDark.value ? darkTheme : null;
})
</script>
