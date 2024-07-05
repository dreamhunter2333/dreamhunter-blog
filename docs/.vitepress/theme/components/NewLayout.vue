<template>
    <Layout>
        <template #doc-before>
            <ClientOnly>
                <n-config-provider :theme="naiveTheme">
                    <n-card v-if="!$frontmatter.page" size="small" :bordered="false" style="margin-bottom: 20px;">
                        <n-flex justify="center">
                            <n-tag round :bordered="false">
                                <template #icon>
                                    <n-icon size="15" :component="Clock" />
                                </template>
                                {{ $frontmatter.date?.substring(0, 10) }}
                            </n-tag>
                            <a v-for="(item, index2) in $frontmatter.tags" v-bind:key="index2"
                                :href="withBase(`/pages/tags.html?tag=${item}`)">
                                <n-tag round :bordered="false" strong class="hover-pointer" type="info">
                                    <span>{{ item }}</span>
                                    <template #icon>
                                        <n-icon size="15" :component="Tag" />
                                    </template>
                                </n-tag>
                            </a>
                        </n-flex>
                    </n-card>
                </n-config-provider>
            </ClientOnly>
        </template>
        <template #doc-after>
            <div :key="giscusKey">
                <Giscus id="comments" repo="dreamhunter2333/dreamhunter-blog" repoId="MDEwOlJlcG9zaXRvcnkzMzIyNTA3MTc="
                    category="General" categoryId="DIC_kwDOE82-Xc4CgbBf" mapping="pathname" reactionsEnabled="1"
                    emitMetadata="0" inputPosition="top" :theme="isDark ? 'dark' : 'light'" lang="zh-CN"
                    loading="lazy" />
            </div>
        </template>
    </Layout>
</template>
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from "vitepress";
import Giscus from '@giscus/vue';
import { computed } from 'vue';
import { NConfigProvider, darkTheme, NTag, NFlex, NIcon, NCard } from "naive-ui";
import { Clock, Tag } from '@vicons/fa';

const { isDark, frontmatter } = useData();
const { Layout } = DefaultTheme;
const naiveTheme = computed(() => isDark.value ? darkTheme : null);
const giscusKey = computed(() => {
    return `${frontmatter.value.title}-${frontmatter.value.date}-${frontmatter.value?.tags?.join('')}`;
})
</script>
