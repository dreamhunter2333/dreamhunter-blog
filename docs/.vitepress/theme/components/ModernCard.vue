<script setup lang="ts">
import { ExternalLinkIcon, GitHubIcon } from './icons'
interface Props {
  title: string
  description?: string
  date?: string
  tags?: string[]
  href?: string
  githubUrl?: string
  demoUrl?: string
  variant?: 'default' | 'project' | 'workshop'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  description: '',
  tags: () => []
})

// 日期格式化器（只创建一次）
const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

function formatDate(date: string) {
  return dateFormatter.format(new Date(date))
}

// URL 验证
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}
</script>

<template>
  <component
    :is="variant === 'default' ? 'a' : 'div'"
    :href="variant === 'default' ? href : undefined"
    :aria-label="variant === 'default' ? `Read article: ${title}` : undefined"
    :class="['modern-card', `modern-card--${variant}`]"
  >
    <h3 class="modern-card-title">{{ title }}</h3>
    <p class="modern-card-description">{{ description }}</p>
    <div class="modern-card-footer">
      <span v-if="date" class="modern-card-date">{{ formatDate(date) }}</span>
      <div v-if="tags && tags.length > 0" class="modern-card-tags">
        <span v-for="tag in tags.slice(0, 3)" :key="tag" class="modern-card-tag">
          {{ tag }}
        </span>
      </div>
    </div>
    <div v-if="variant !== 'default' && (githubUrl || demoUrl)" class="modern-card-actions">
      <a
        v-if="githubUrl && isValidUrl(githubUrl)"
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="action-button action-button--github"
        aria-label="View source on GitHub"
      >
        <GitHubIcon />
        GitHub
      </a>
      <a
        v-if="demoUrl && isValidUrl(demoUrl)"
        :href="demoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="action-button action-button--demo"
        aria-label="View live demo"
      >
        <ExternalLinkIcon />
        Demo
      </a>
    </div>
  </component>
</template>

<style scoped>
.modern-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--theme-radius-md);
  padding: 1rem;
  transition: all var(--theme-transition-base);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.modern-card::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  transition: width 0.3s ease;
}

.modern-card:hover {
  transform: translateY(-4px);
  text-decoration: none;
}

.modern-card:hover::after {
  width: 100%;
}

/* 默认样式 - 文章 */
.modern-card--default {
  padding: 0.75rem;
}

.modern-card--default:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

/* 项目样式 */
.modern-card--project {
  cursor: default;
}

.modern-card--project:hover {
  box-shadow: 0 12px 24px rgba(0, 161, 214, 0.12);
}

/* 工坊样式 */
.modern-card--workshop {
  cursor: default;
}

.modern-card--workshop:hover {
  box-shadow: 0 12px 24px rgba(251, 114, 153, 0.12);
}

.modern-card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.375rem 0;
  line-height: 1.4;
}

/* 默认样式 - 文章底部下划线（粉蓝间隔） */
.modern-card--default:nth-child(odd)::after {
  background: var(--theme-primary-500);
}

.modern-card--default:nth-child(even)::after {
  background: var(--theme-pink-500);
}

/* 默认样式 - 文章卡片描述更简洁 */
.modern-card--default .modern-card-description {
  -webkit-line-clamp: 1;
  margin-bottom: 0.375rem;
  font-size: 0.8125rem;
}

/* 项目样式 - 蓝色底部下划线 */
.modern-card--project::after {
  background: var(--theme-primary-500);
}

/* 工坊样式 - 粉色底部下划线 */
.modern-card--workshop::after {
  background: var(--theme-pink-500);
}

.modern-card-description {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.modern-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: auto;
}

.modern-card-date {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
  white-space: nowrap;
}

.modern-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-left: auto;
}

.modern-card-tag {
  font-size: 0.6875rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
}

/* 默认标签样式 - 粉蓝间隔 */
.modern-card--default .modern-card-tag:nth-child(odd) {
  background: rgba(0, 161, 214, 0.1);
  color: var(--theme-primary-500);
}

.modern-card--default .modern-card-tag:nth-child(even) {
  background: rgba(251, 114, 153, 0.1);
  color: var(--theme-pink-500);
}

/* 项目标签样式 */
.modern-card--project .modern-card-tag {
  background: rgba(0, 161, 214, 0.1);
  color: var(--theme-primary-500);
}

/* 工坊标签样式 */
.modern-card--workshop .modern-card-tag {
  background: rgba(251, 114, 153, 0.1);
  color: var(--theme-pink-500);
}

/* 操作按钮区域 */
.modern-card-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.action-button {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.action-button svg {
  flex-shrink: 0;
}

/* 项目卡片的按钮 - 粉色（与蓝色横线相对） */
.modern-card--project .action-button--github:hover {
  color: var(--theme-pink-500);
  border-color: var(--theme-pink-500);
  background: rgba(251, 114, 153, 0.05);
}

.modern-card--project .action-button--demo:hover {
  color: var(--theme-pink-500);
  border-color: var(--theme-pink-500);
  background: rgba(251, 114, 153, 0.05);
}

/* 工坊卡片的按钮 - 蓝色（与粉色横线相对） */
.modern-card--workshop .action-button--github:hover {
  color: var(--theme-primary-500);
  border-color: var(--theme-primary-500);
  background: rgba(0, 161, 214, 0.05);
}

.modern-card--workshop .action-button--demo:hover {
  color: var(--theme-primary-500);
  border-color: var(--theme-primary-500);
  background: rgba(0, 161, 214, 0.05);
}
</style>
