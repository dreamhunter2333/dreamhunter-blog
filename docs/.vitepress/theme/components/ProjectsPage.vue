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
        <div class="section-title">开源项目</div>

        <!-- 过滤器 -->
        <div class="header-filters">
          <!-- 分类多选框 -->
          <div v-if="allCategories.length > 0" class="multi-select multi-select-category">
            <button
              class="multi-select-trigger"
              @click="categoryDropdownOpen = !categoryDropdownOpen"
            >
              <span>{{ selectedCategories.length > 0 ? `分类 (${selectedCategories.length})` : '分类过滤' }}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 9L1 4h10z"/>
              </svg>
            </button>
            <div v-if="categoryDropdownOpen" class="multi-select-dropdown">
              <label
                v-for="category in allCategories"
                :key="category"
                class="multi-select-option"
              >
                <input
                  type="checkbox"
                  :checked="selectedCategories.includes(category)"
                  @change="toggleCategory(category)"
                  class="multi-select-checkbox"
                />
                <span class="multi-select-label">{{ category }}</span>
              </label>
            </div>
          </div>

          <!-- 标签多选框 -->
          <div v-if="allTags.length > 0" class="multi-select multi-select-tag">
            <button
              class="multi-select-trigger"
              @click="tagDropdownOpen = !tagDropdownOpen"
            >
              <span>{{ selectedTags.length > 0 ? `标签 (${selectedTags.length})` : '标签过滤' }}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 9L1 4h10z"/>
              </svg>
            </button>
            <div v-if="tagDropdownOpen" class="multi-select-dropdown">
              <label
                v-for="tag in allTags"
                :key="tag"
                class="multi-select-option"
              >
                <input
                  type="checkbox"
                  :checked="selectedTags.includes(tag)"
                  @change="toggleTag(tag)"
                  class="multi-select-checkbox"
                />
                <span class="multi-select-label">{{ tag }}</span>
              </label>
            </div>
          </div>

          <span class="page-stats">共 {{ filteredProjects.length }} 个</span>
        </div>
      </div>

      <!-- 已选择的标签显示 -->
      <div v-if="selectedCategories.length > 0 || selectedTags.length > 0" class="selected-filters">
        <span
          v-for="category in selectedCategories"
          :key="'cat-' + category"
          class="selected-tag"
        >
          {{ category }}
          <button class="remove-tag" @click="toggleCategory(category)">×</button>
        </span>
        <span
          v-for="tag in selectedTags"
          :key="'tag-' + tag"
          class="selected-tag selected-tag--tag"
        >
          {{ tag }}
          <button class="remove-tag" @click="toggleTag(tag)">×</button>
        </span>
        <button class="clear-filters-inline" @click="clearFilters">
          清除全部
        </button>
      </div>

      <div class="content-grid">
        <ModernCard
          v-for="project in filteredProjects"
          :key="project.regularPath"
          :title="project.frontMatter.title"
          :description="project.frontMatter.description"
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
  gap: 0.75rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
}

.header-filters {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.page-stats {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

/* 自定义多选框样式 */
.multi-select {
  position: relative;
}

.multi-select-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 110px;
  padding: 0.25rem 0.625rem;
  font-size: 0.8125rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.multi-select-trigger:hover {
  border-color: var(--vp-c-brand-1);
}

.multi-select-trigger svg {
  opacity: 0.5;
  transition: transform 0.2s ease;
}

.multi-select-trigger:hover svg {
  opacity: 0.8;
}

.multi-select-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 180px;
  max-height: 300px;
  overflow-y: auto;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 50;
  padding: 0.25rem;
}

.multi-select-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s ease;
  user-select: none;
}

.multi-select-option:hover {
  background: var(--vp-c-bg-soft);
}

.multi-select-checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  cursor: pointer;
  appearance: none;
  background: var(--vp-c-bg);
  transition: all 0.2s ease;
  position: relative;
  flex-shrink: 0;
}

.multi-select-checkbox:checked {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.multi-select-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.multi-select-checkbox:hover {
  border-color: var(--vp-c-brand-1);
}

.multi-select-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  flex: 1;
}

/* 已选择的标签显示 */
.selected-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.selected-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: rgba(0, 161, 214, 0.1);
  color: #00A1D6;
  font-weight: 500;
}

.selected-tag--tag {
  background: rgba(251, 114, 153, 0.1);
  color: #FB7299;
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
  transition: opacity 0.2s ease;
}

.remove-tag:hover {
  opacity: 1;
}

.clear-filters-inline {
  font-size: 0.75rem;
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
  border: 1px solid #FB7299;
  background: transparent;
  color: #FB7299;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-weight: 500;
}

.clear-filters-inline:hover {
  background: #FB7299;
  color: #fff;
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
