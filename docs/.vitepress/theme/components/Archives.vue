<template>
    <ClientOnly>
        <n-config-provider :theme="naiveTheme">
            <n-card>
                <n-timeline>
                    <n-timeline-item v-for="(yearList, index)  in data" v-bind:key="index"
                        :title="yearList[0].frontMatter.date.split('-')[0]">
                        <n-list>
                            <n-list-item v-for="(article, index) in yearList" :key="index">
                                <a :href="withBase(article.regularPath)" class="posts">
                                    <div class="post-container">
                                        <div class="post-dot"></div>
                                        {{ article.frontMatter.title }}
                                    </div>
                                </a>
                                <template #prefix>
                                    <n-tag :bordered="false" type="info">
                                        {{ article.frontMatter.date.slice(5) }}
                                    </n-tag>
                                </template>
                            </n-list-item>
                        </n-list>
                    </n-timeline-item>
                </n-timeline>
            </n-card>
        </n-config-provider>
    </ClientOnly>
</template>

<script lang="ts" setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { useYearSort } from '../functions'
import {
    NCard, NTag, NConfigProvider, darkTheme,
    NList, NListItem, NTimeline, NTimelineItem
} from "naive-ui";

const { theme, isDark } = useData()
const naiveTheme = computed(() => {
    return isDark.value ? darkTheme : null;
})
const data = computed(() => useYearSort(theme.value.posts))
</script>

<style scoped>
a {
    color: var(--vp-c-text-1);
    text-decoration: none;
}
</style>
