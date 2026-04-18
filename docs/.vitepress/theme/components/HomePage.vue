<template>
  <div class="home-container">
    <section class="compact-hero">
      <div class="hero-main">
        <h1 class="hero-title">
          Hi, I'm <span class="hero-name">Dream Hunter</span>
        </h1>
        <p class="hero-tagline">
          {{ theme.description || '你指尖跃动的电光，是我此生不变的信仰' }}
        </p>
      </div>
    </section>

    <section class="posts-section">
      <div class="section-header">
        <div class="section-title">最新文章</div>
        <a :href="withBase('/pages/posts.html')" class="view-all-link">
          查看全部
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

    <section v-if="recentWorks.length > 0" class="featured-section">
      <div class="section-header">
        <div class="section-title">最新作品</div>
        <a :href="withBase('/pages/projects.html')" class="view-all-link">
          查看全部
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

    <ClientOnly>
      <SakanaWidgetPlugin v-if="!isMobile" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { useIsMobile } from '../utils/composables'
import { CustomThemeConfig, Post } from '../type'
import SakanaWidgetPlugin from './SakanaWidgetPlugin.vue'
import ModernCard from './ModernCard.vue'

const isMobile = useIsMobile()
const { theme } = useData<CustomThemeConfig>()

const posts = theme.value.posts
const recentWorks = theme.value.recentWorks || []

// 主页只显示最新的6篇文章
const recentPosts = computed(() => posts.slice(0, 6))
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;
  position: relative;
}

.compact-hero {
  padding: 2.5rem 0 2rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.hero-main {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hero-title {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.3;
  color: var(--vp-c-text-1);
  margin: 0;
  letter-spacing: -0.02em;
}

.hero-name {
  color: var(--vp-c-text-1);
  font-weight: 800;
}

.hero-tagline {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.75;
}

.featured-section {
  margin-bottom: 2rem;
}

.posts-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
  letter-spacing: -0.005em;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.25rem;
}

.view-all-link {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: color var(--theme-transition-fast);
}

.view-all-link:hover {
  color: var(--vp-c-text-1);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

.content-grid > * {
  animation: fadeSlideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.content-grid > *:nth-child(1) { animation-delay: 0ms; }
.content-grid > *:nth-child(2) { animation-delay: 50ms; }
.content-grid > *:nth-child(3) { animation-delay: 100ms; }
.content-grid > *:nth-child(4) { animation-delay: 150ms; }
.content-grid > *:nth-child(5) { animation-delay: 200ms; }
.content-grid > *:nth-child(6) { animation-delay: 250ms; }

@media (max-width: 768px) {
  .compact-hero {
    padding: 1.75rem 0 1.5rem;
  }

  .home-container {
    padding: 0 1rem 1.5rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
