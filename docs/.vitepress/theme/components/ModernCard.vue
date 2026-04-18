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

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

function formatDate(date: string) {
  return dateFormatter.format(new Date(date))
}

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
    :is="variant === 'default' ? 'a' : 'article'"
    :href="variant === 'default' ? href : undefined"
    :aria-label="variant === 'default' ? `Read article: ${title}` : undefined"
    :tabindex="undefined"
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
        class="action-button"
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
        class="action-button"
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
  border-radius: 14px;
  padding: 1.25rem;
  transition: border-color var(--theme-transition-fast),
              background var(--theme-transition-fast),
              box-shadow var(--theme-transition-fast),
              transform var(--theme-transition-fast);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  height: 100%;
  color: inherit;
  box-shadow: var(--theme-shadow-sm);
}

.modern-card--default {
  cursor: pointer;
}

.modern-card--default:hover {
  border-color: var(--vp-c-border);
  background: var(--vp-c-bg);
  box-shadow: var(--theme-shadow-lg);
  transform: translateY(-4px);
}

.modern-card--project,
.modern-card--workshop {
  cursor: default;
}

.modern-card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.625rem 0;
  line-height: 1.4;
  transition: color var(--theme-transition-fast);
}

.modern-card--default:hover .modern-card-title {
  color: var(--theme-tag-primary);
}

.modern-card-description {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.modern-card--default .modern-card-description {
  -webkit-line-clamp: 2;
  line-clamp: 2;
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
  gap: 0.375rem;
  margin-left: auto;
}

.modern-card-tag {
  font-size: 12px;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  font-weight: 500;
  border: 1px solid transparent;
  transition: all var(--theme-transition-fast);
}

.modern-card-tag:nth-child(odd) {
  background: var(--theme-tag-primary-bg);
  color: var(--theme-tag-primary);
  border-color: var(--theme-tag-primary-border);
}

.modern-card-tag:nth-child(even) {
  background: var(--theme-tag-secondary-bg);
  color: var(--theme-tag-secondary);
  border-color: var(--theme-tag-secondary-border);
}

.modern-card:hover .modern-card-tag:nth-child(odd) {
  background: var(--theme-tag-primary-bg-hover);
  border-color: var(--theme-tag-primary-border-hover);
}

.modern-card:hover .modern-card-tag:nth-child(even) {
  background: var(--theme-tag-secondary-bg-hover);
  border-color: var(--theme-tag-secondary-border-hover);
}

.modern-card-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.action-button {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  transition: background var(--theme-transition-fast),
              border-color var(--theme-transition-fast),
              color var(--theme-transition-fast);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.action-button:hover {
  border-color: var(--theme-text-strong);
  color: var(--theme-text-strong);
  background: var(--vp-c-bg-soft);
}

.action-button svg {
  flex-shrink: 0;
}
</style>
