<template>
    <ClientOnly>
        <n-config-provider :theme="naiveTheme">
            <n-card :bordered="!isDark">
                <n-timeline size="large">
                    <n-timeline-item type="info" v-for="(year, index) in yearList" v-bind:key="index" :title="year">
                        <n-list>
                            <n-list-item v-for="(article, index) in yearData[year]" :key="index">
                                <div>
                                    <a :href="withBase(article.regularPath)">
                                        {{ article.frontMatter.title }}
                                    </a>
                                </div>
                                <template #prefix>
                                    <n-tag round :bordered="false" type="info">
                                        <template #icon>
                                            <n-icon size="15" :component="Clock" />
                                        </template>
                                        {{ article.frontMatter.date.slice(5) }}
                                    </n-tag>
                                </template>
                            </n-list-item>
                        </n-list>
                    </n-timeline-item>
                    <n-timeline-item />
                </n-timeline>
            </n-card>
        </n-config-provider>
    </ClientOnly>
</template>

<script lang="ts" setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import {
    NCard, NTag, NConfigProvider, darkTheme, NIcon,
    NList, NListItem, NTimeline, NTimelineItem
} from "naive-ui";
import { Clock } from '@vicons/fa';
import { Post } from '../type';

const { theme, isDark } = useData()
const naiveTheme = computed(() => isDark.value ? darkTheme : null)
const yearData = computed(() => {
    const data: Record<string, Post[]> = {};
    for (const element of theme.value.posts) {
        if (!element.frontMatter) continue
        const y = element.frontMatter.date.split('-')[0]
        if (!data[y]) {
            data[y] = []
        }
        data[y].push(element);
    }
    return data;
});
const yearList = computed(() =>
    Object.keys(yearData.value).sort((a, b) => b > a ? 1 : -1)
);
</script>

<style scoped>
a {
    color: var(--vp-c-text-1);
    text-decoration: none;
}
</style>
