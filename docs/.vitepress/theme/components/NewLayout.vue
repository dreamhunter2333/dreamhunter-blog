<template>
  <Layout>
    <template #doc-before>
      <ClientOnly>
        <div v-if="!$frontmatter.page" class="article-meta">
          <button @click="goBack" class="back-button" title="返回">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10 14L4 8l6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            返回
          </button>
          <div class="article-tags">
            <span class="article-tag article-tag--date">{{ formatDate($frontmatter.date) }}</span>
            <a
              v-for="(item, index2) in $frontmatter.tags"
              :key="index2"
              :href="withBase(`/pages/posts.html?tag=${encodeURIComponent(item)}`)"
              class="article-tag"
              :class="{ 'article-tag--primary': index2 % 2 === 0, 'article-tag--pink': index2 % 2 === 1 }"
            >
              {{ item }}
            </a>
          </div>
        </div>
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

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from "vitepress"
import Giscus from '@giscus/vue'
import { computed } from 'vue'

const { isDark, frontmatter } = useData()
const { Layout } = DefaultTheme

const giscusKey = computed(() => {
    return `${frontmatter.value.title}-${frontmatter.value.date}-${frontmatter.value?.tags?.join('')}`
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function goBack() {
  if (typeof window !== 'undefined') {
    window.history.back()
  }
}
</script>

<style scoped>
.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin: -1.5rem 0 1.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.back-button:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.back-button svg {
  flex-shrink: 0;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
  justify-content: flex-end;
}

.article-tag {
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
  cursor: pointer;
}

.article-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.article-tag--date {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: default;
}

.article-tag--date:hover {
  transform: none;
  box-shadow: none;
}

.article-tag--primary {
  background: rgba(0, 161, 214, 0.1);
  color: #00A1D6;
}

.article-tag--primary:hover {
  background: rgba(0, 161, 214, 0.15);
}

.article-tag--pink {
  background: rgba(251, 114, 153, 0.1);
  color: #FB7299;
}

.article-tag--pink:hover {
  background: rgba(251, 114, 153, 0.15);
}
</style>
