<template>
  <div>
    <j-card :bordered="!isDark">
      <j-timeline size="large">
        <j-timeline-item v-for="(year, index) in yearList" :key="index" type="info" :title="year">
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <j-article-item
              v-for="(article, articleIndex) in yearData[year]" :key="articleIndex"
              :href="withBase(article.regularPath)"
              :title="article.frontMatter.title"
              :date="article.frontMatter.date?.slice(0, 10)"
            />
          </div>
        </j-timeline-item>
        <j-timeline-item />
      </j-timeline>
    </j-card>
  </div>
</template>

<script lang="ts" setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { Post } from '../type'
import JCard from './base/JCard.vue'
import JTimeline from './base/JTimeline.vue'
import JTimelineItem from './base/JTimelineItem.vue'
import JArticleItem from './base/JArticleItem.vue'

const { theme, isDark } = useData()

const yearData = computed(() => {
    const data: Record<string, Post[]> = {}
    for (const element of theme.value.posts) {
        if (!element.frontMatter) continue
        const y = element.frontMatter.date.split('-')[0]
        if (!data[y]) {
            data[y] = []
        }
        data[y].push(element)
    }
    return data
})

const yearList = computed(() =>
    Object.keys(yearData.value).sort((a, b) => b > a ? 1 : -1)
)
</script>

<style scoped>
a {
    color: var(--vp-c-text-1);
    text-decoration: none;
}
</style>
