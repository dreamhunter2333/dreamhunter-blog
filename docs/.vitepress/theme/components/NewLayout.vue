<template>
  <Layout>
    <template #doc-before>
      <ClientOnly>
        <j-container v-if="!$frontmatter.page" gap="8px" style="margin: 12px 0 12px 0;">
          <j-tag round :bordered="false">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15" height="15" fill="currentColor">
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/>
              </svg>
            </template>
            {{ $frontmatter.date?.slice(0, 10) }}
          </j-tag>
          <a
            v-for="(item, index2) in $frontmatter.tags" :key="index2"
            :href="withBase(`/pages/tags.html?tag=${item}`)"
          >
            <j-tag round :bordered="false" strong class="hover-pointer" type="info">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15" height="15" fill="currentColor">
                  <path d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"/>
                </svg>
              </template>
              <span>{{ item }}</span>
            </j-tag>
          </a>
        </j-container>
      </ClientOnly>
    </template>
    <template #doc-after>
      <ClientOnly>
        <div :key="giscusKey">
          <Giscus
            id="comments" repo="dreamhunter2333/dreamhunter-blog"
            repo-id="MDEwOlJlcG9zaXRvcnkzMzIyNTA3MTc=" category="General" category-id="DIC_kwDOE82-Xc4CgbBf"
            mapping="pathname" reactions-enabled="1" emit-metadata="0" input-position="top"
            :theme="isDark ? 'dark' : 'light'" lang="zh-CN" loading="lazy"
          />
        </div>
      </ClientOnly>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from "vitepress"
import Giscus from '@giscus/vue'
import { computed } from 'vue'
import JTag from './base/JTag.vue'
import JContainer from './base/JContainer.vue'

const { isDark, frontmatter } = useData()
const { Layout } = DefaultTheme

const giscusKey = computed(() => {
    return `${frontmatter.value.title}-${frontmatter.value.date}-${frontmatter.value?.tags?.join('')}`
})
</script>
