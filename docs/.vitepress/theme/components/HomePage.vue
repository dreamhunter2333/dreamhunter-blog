<template>
  <ClientOnly>
    <div class="home-container">
      <!-- 最新文章区域 -->
      <section class="posts-section">
        <div class="section-header">
          <div class="section-title">最新文章</div>
          <a :href="withBase('/pages/posts.html')" class="view-all-link">
            查看全部 →
          </a>
        </div>
        <div class="content-grid">
          <ModernCard
            v-for="post in recentPosts"
            :key="post.regularPath"
            :title="post.frontMatter.title"
            :description="post.frontMatter.description ?? ''"
            :date="post.frontMatter.date"
            :tags="post.frontMatter.tags"
            :href="withBase(post.regularPath)"
            variant="default"
          />
        </div>
      </section>

      <!-- 最新作品区域 -->
      <section v-if="recentWorks.length > 0" class="featured-section">
        <div class="section-header">
          <div class="section-title">最新作品</div>
          <a :href="withBase('/pages/projects.html')" class="view-all-link">
            查看全部 →
          </a>
        </div>
        <div class="content-grid">
          <ModernCard
            v-for="work in recentWorks"
            :key="work.regularPath"
            :title="work.frontMatter.title"
            :description="work.frontMatter.description ?? ''"
            :date="work.frontMatter.date"
            :tags="work.frontMatter.tags"
            :github-url="work.frontMatter.github"
            :demo-url="work.frontMatter.demo"
            :variant="work.type"
          />
        </div>
      </section>
    </div>
    <SakanaWidgetPlugin v-if="!isMobile" />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { useIsMobile } from '../utils/composables'
import { CustomThemeConfig, Post, Project, Workshop } from '../type'
import SakanaWidgetPlugin from './SakanaWidgetPlugin.vue'
import ModernCard from './ModernCard.vue'

const isMobile = useIsMobile()
const { theme } = useData<CustomThemeConfig>()

const posts = theme.value.posts
const projects = theme.value.projects || []
const workshops = theme.value.workshops || []

// 获取最新的项目和工坊（按日期排序，总共3个）
const recentWorks = computed(() => {
  const allWorks = [
    ...projects.map((p: Project) => ({ ...p, type: 'project' as const })),
    ...workshops.map((w: Workshop) => ({ ...w, type: 'workshop' as const }))
  ].sort((a, b) => {
    const dateA = new Date(a.frontMatter.date || 0).getTime()
    const dateB = new Date(b.frontMatter.date || 0).getTime()
    return dateB - dateA
  })
  return allWorks.slice(0, 3)
})

// 主页只显示最新的6篇文章
const recentPosts = computed(() => posts.slice(0, 6))
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 0;
}

.featured-section {
  margin-bottom: 2rem;
  margin-top: 0;
}

.posts-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 1.5rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header .section-title {
  margin-bottom: 0;
}

.view-all-link {
  color: #00A1D6;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.view-all-link:hover {
  color: #0088B8;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .home-container {
    padding: 0 1rem 1.5rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
