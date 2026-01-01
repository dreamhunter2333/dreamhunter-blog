<!-- 文章列表项组件 - Article List Item Component -->
<template>
  <a :href="href" class="j-article-item">
    <div class="j-article-item__content">
      <div class="j-article-item__header">
        <span v-if="dot" :class="['j-article-item__dot', dotType && `j-article-item__dot--${dotType}`]"></span>
        <h3 class="j-article-item__title">{{ title }}</h3>
      </div>
      <div v-if="date || $slots.meta" class="j-article-item__meta">
        <slot name="meta">
          <j-tag v-if="date" type="info" round :bordered="false">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15" height="15" fill="currentColor">
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/>
              </svg>
            </template>
            {{ date }}
          </j-tag>
        </slot>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import JTag from './JTag.vue'

defineProps<{
  href: string
  title: string
  date?: string
  dot?: boolean
  dotType?: 'info' | 'success' | 'warning' | 'error'
}>()
</script>

<style scoped>
.j-article-item {
  display: block;
  padding: 16px 20px;
  background: var(--jp-card);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin-bottom: 12px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: var(--jp-shadow-sm);
  position: relative;
  overflow: hidden;
}

.j-article-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: var(--jp-gradient-hero);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.j-article-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--jp-shadow-md);
}

.j-article-item:hover::before {
  opacity: 1;
}

.j-article-item__header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.j-article-item__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.j-article-item__dot--success {
  background: var(--jp-accent);
}

.j-article-item__dot--warning {
  background: var(--jp-lemon);
}

.j-article-item__dot--error {
  background: var(--jp-peach);
}

.j-article-item__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.j-article-item__meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 960px) {
  .j-article-item {
    padding: 12px 16px;
  }

  .j-article-item__title {
    font-size: 15px;
  }
}
</style>
