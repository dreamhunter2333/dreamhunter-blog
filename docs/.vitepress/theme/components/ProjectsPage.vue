<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useData, withBase } from 'vitepress'
import { CustomThemeConfig } from '../type'
import ModernCard from './ModernCard.vue'

const { theme } = useData<CustomThemeConfig>()
const projects = (theme.value as any).projects || []

// 过滤状态
const selectedCategories = ref<string[]>([])
const selectedTags = ref<string[]>([])

// 下拉框打开状态
const categoryDropdownOpen = ref(false)
const tagDropdownOpen = ref(false)

// 从 URL 参数初始化过滤条件
onMounted(() => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const tagParam = urlParams.get('tag')
    const categoryParam = urlParams.get('category')

    if (tagParam) {
      selectedTags.value = [decodeURIComponent(tagParam)]
    }
    if (categoryParam) {
      selectedCategories.value = [decodeURIComponent(categoryParam)]
    }
  }
})

// 获取所有分类和标签
const allCategories = computed(() => {
  const categories = new Set<string>()
  projects.forEach((project: any) => {
    const cats = project.frontMatter.categories || project.frontMatter.category
    if (!cats) return
    const tmpCategories = Array.isArray(cats) ? cats : [cats]
    tmpCategories.forEach((cat: string) => categories.add(cat))
  })
  return Array.from(categories).sort()
})

const allTags = computed(() => {
  const tags = new Set<string>()
  projects.forEach((project: any) => {
    if (project.frontMatter.tags) {
      project.frontMatter.tags.forEach((tag: string) => tags.add(tag))
    }
  })
  return Array.from(tags).sort()
})

// 过滤后的项目
const filteredProjects = computed(() => {
  return projects.filter((project: any) => {
    // 分类过滤
    if (selectedCategories.value.length > 0) {
      const cats = project.frontMatter.categories || project.frontMatter.category
      if (!cats) return false
      const projectCategories = Array.isArray(cats) ? cats : [cats]
      if (!projectCategories.some(cat => selectedCategories.value.includes(cat))) {
        return false
      }
    }

    // 标签过滤
    if (selectedTags.value.length > 0) {
      if (!project.frontMatter.tags || !project.frontMatter.tags.some((tag: string) => selectedTags.value.includes(tag))) {
        return false
      }
    }

    return true
  })
})

// 切换分类选择
function toggleCategory(category: string) {
  const index = selectedCategories.value.indexOf(category)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(category)
  }
}

// 切换标签选择
function toggleTag(tag: string) {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

// 清除所有过滤
function clearFilters() {
  selectedCategories.value = []
  selectedTags.value = []
}

// 关闭下拉框（点击外部）
function handleClickOutside(event: MouseEvent, type: 'category' | 'tag') {
  const target = event.target as HTMLElement
  const dropdown = document.querySelector(`.multi-select-${type}`)
  if (dropdown && !dropdown.contains(target)) {
    if (type === 'category') {
      categoryDropdownOpen.value = false
    } else {
      tagDropdownOpen.value = false
    }
  }
}

// 添加全局点击监听
if (typeof window !== 'undefined') {
  document.addEventListener('click', (e) => {
    handleClickOutside(e, 'category')
    handleClickOutside(e, 'tag')
  })
}
</script>

<template>
  <ClientOnly>
    <div class="projects-container">
      <div class="section-header">
        <h2 class="section-title">开源项目</h2>

        <!-- 现代化下拉过滤器 -->
        <div class="header-filters">
          <div v-if="allCategories.length > 0" class="multi-select multi-select-category">
            <button
              class="multi-select-trigger"
              :class="{ 'is-active': categoryDropdownOpen }"
              @click="categoryDropdownOpen = !categoryDropdownOpen"
            >
              <span>{{ selectedCategories.length > 0 ? `分类 (${selectedCategories.length})` : '分类过滤' }}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 9L1 4h10z" /></svg>
            </button>
            <div v-if="categoryDropdownOpen" class="multi-select-dropdown">
              <label v-for="category in allCategories" :key="category" class="multi-select-option">
                <input
                  type="checkbox"
                  :checked="selectedCategories.includes(category)"
                  class="multi-select-checkbox"
                  @change="toggleCategory(category)"
                />
                <span class="multi-select-label">{{ category }}</span>
              </label>
            </div>
          </div>

          <div v-if="allTags.length > 0" class="multi-select multi-select-tag">
            <button
              class="multi-select-trigger"
              :class="{ 'is-active': tagDropdownOpen }"
              @click="tagDropdownOpen = !tagDropdownOpen"
            >
              <span>{{ selectedTags.length > 0 ? `标签 (${selectedTags.length})` : '标签过滤' }}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 9L1 4h10z" /></svg>
            </button>
            <div v-if="tagDropdownOpen" class="multi-select-dropdown">
              <label v-for="tag in allTags" :key="tag" class="multi-select-option">
                <input
                  type="checkbox"
                  :checked="selectedTags.includes(tag)"
                  class="multi-select-checkbox"
                  @change="toggleTag(tag)"
                />
                <span class="multi-select-label">{{ tag }}</span>
              </label>
            </div>
          </div>

          <span class="page-stats">共 {{ filteredProjects.length }} 个</span>
        </div>
      </div>

      <!-- 已选择的标签行 -->
      <div v-if="selectedCategories.length > 0 || selectedTags.length > 0" class="selected-filters">
        <span v-for="category in selectedCategories" :key="'cat-' + category" class="selected-tag">
          {{ category }}
          <button class="remove-tag" @click="toggleCategory(category)">×</button>
        </span>
        <span v-for="tag in selectedTags" :key="'tag-' + tag" class="selected-tag selected-tag--tag">
          {{ tag }}
          <button class="remove-tag" @click="toggleTag(tag)">×</button>
        </span>
        <button class="clear-filters-inline" @click="clearFilters">清除全部</button>
      </div>

      <div class="content-grid">
        <ModernCard
          v-for="project in filteredProjects"
          :key="project.regularPath"
          :title="project.frontMatter.title"
          :description="project.frontMatter.description ?? ''"
          :date="project.frontMatter.date"
          :tags="project.frontMatter.tags"
          :github-url="project.frontMatter.github"
          :demo-url="project.frontMatter.demo"
          variant="project"
        />
      </div>

      <div v-if="filteredProjects.length === 0" class="empty-state">
        <p>暂无项目</p>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin: 0;
  letter-spacing: -0.02em;
}

.header-filters {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.page-stats {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  margin-left: 0.5rem;
}

/* ================= 玻璃拟态下拉框 ================= */
.multi-select {
  position: relative;
}

.multi-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-width: 120px;
  padding: 0.4rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.multi-select-trigger:hover, .multi-select-trigger.is-active {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 161, 214, 0.08);
}

.multi-select-trigger svg {
  opacity: 0.5;
  transition: transform 0.3s ease;
}

.multi-select-trigger.is-active svg {
  transform: rotate(180deg);
  opacity: 1;
}

.multi-select-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 220px;
  max-height: 300px;
  overflow-y: auto;
  background: var(--vp-c-bg-elv);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.04);
  z-index: 100;
  padding: 0.375rem;
}

.multi-select-option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s ease;
  user-select: none;
}

.multi-select-option:hover {
  background: var(--vp-c-default-soft);
}

.multi-select-checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  appearance: none;
  background: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.multi-select-checkbox:checked {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.multi-select-checkbox:checked::after {
  content: '';
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translateY(-1px);
}

.multi-select-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  flex: 1;
}

/* ================= 选中状态药丸行 ================= */
.selected-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px dashed var(--vp-c-divider);
}

.selected-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  padding: 0.25rem 0.625rem;
  border-radius: 99px;
  background: rgba(0, 161, 214, 0.1);
  color: var(--theme-primary-500);
  font-weight: 600;
}

.selected-tag--tag {
  background: rgba(251, 114, 153, 0.1);
  color: var(--theme-pink-500);
}

.remove-tag {
  border: none;
  background: none;
  color: inherit;
  font-size: 1.125rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  margin-left: 0.125rem;
  opacity: 0.6;
  transition: all 0.2s ease;
}

.remove-tag:hover {
  opacity: 1;
  transform: scale(1.1);
}

.clear-filters-inline {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  border: 1px solid var(--theme-pink-500);
  background: transparent;
  color: var(--theme-pink-500);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  margin-left: 0.5rem;
}

.clear-filters-inline:hover {
  background: var(--theme-pink-500);
  color: #fff;
  box-shadow: 0 2px 8px rgba(251, 114, 153, 0.3);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--vp-c-text-3);
}

@media (max-width: 768px) {
  .projects-container {
    padding: 0 1rem 1.5rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.125rem;
  }
}
</style>
