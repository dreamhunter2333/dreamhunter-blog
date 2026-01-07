<script setup lang="ts">
interface Props {
  title: string
  description: string
  date?: string
  tags?: string[]
  href?: string
  githubUrl?: string
  demoUrl?: string
  variant?: 'default' | 'project' | 'workshop'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
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
      <a v-if="githubUrl && isValidUrl(githubUrl)" :href="githubUrl" target="_blank" rel="noopener noreferrer" class="action-button action-button--github">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 496 512" fill="currentColor">
          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
        </svg>
        GitHub
      </a>
      <a v-if="demoUrl && isValidUrl(demoUrl)" :href="demoUrl" target="_blank" rel="noopener noreferrer" class="action-button action-button--demo">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512" fill="currentColor">
          <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/>
        </svg>
        Demo
      </a>
    </div>
  </component>
</template>

<style scoped>
.modern-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
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
  background: #00A1D6;
}

.modern-card--default:nth-child(even)::after {
  background: #FB7299;
}

/* 默认样式 - 文章卡片描述更简洁 */
.modern-card--default .modern-card-description {
  -webkit-line-clamp: 1;
  margin-bottom: 0.375rem;
  font-size: 0.8125rem;
}

/* 项目样式 - 蓝色底部下划线 */
.modern-card--project::after {
  background: #00A1D6;
}

/* 工坊样式 - 粉色底部下划线 */
.modern-card--workshop::after {
  background: #FB7299;
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
  color: #00A1D6;
}

.modern-card--default .modern-card-tag:nth-child(even) {
  background: rgba(251, 114, 153, 0.1);
  color: #FB7299;
}

/* 项目标签样式 */
.modern-card--project .modern-card-tag {
  background: rgba(0, 161, 214, 0.1);
  color: #00A1D6;
}

/* 工坊标签样式 */
.modern-card--workshop .modern-card-tag {
  background: rgba(251, 114, 153, 0.1);
  color: #FB7299;
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
  color: #FB7299;
  border-color: #FB7299;
  background: rgba(251, 114, 153, 0.05);
}

.modern-card--project .action-button--demo:hover {
  color: #FB7299;
  border-color: #FB7299;
  background: rgba(251, 114, 153, 0.05);
}

/* 工坊卡片的按钮 - 蓝色（与粉色横线相对） */
.modern-card--workshop .action-button--github:hover {
  color: #00A1D6;
  border-color: #00A1D6;
  background: rgba(0, 161, 214, 0.05);
}

.modern-card--workshop .action-button--demo:hover {
  color: #00A1D6;
  border-color: #00A1D6;
  background: rgba(0, 161, 214, 0.05);
}
</style>
