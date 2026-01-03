<!-- 标签/分类列表共享组件 - Shared Tag/Category List Component -->
<template>
  <div>
    <!-- 标签/分类选择器 -->
    <div :class="cardClass" style="margin-top: 24px; margin-bottom: 24px;">
      <j-container gap="12">
        <j-tag
          v-for="(item, key, index) in data" :key="index" round strong
          class="hover-pointer" :checkable="selectedItem == key" :checked="selectedItem == key" :type="getRandomTagColor(index)"
          size="small"
          @click="toggleItem(key)"
        >
          {{ key }}
          <template #suffix>
            <j-badge :value="data[key].length" :type="getRandomTagColor(index)" />
          </template>
        </j-tag>
      </j-container>
    </div>

    <!-- 文章网格 - 自适应排列 -->
    <div v-if="selectedItem" class="article-grid-container">
      <j-card
        v-for="(article, index) in data[selectedItem]"
        :key="index"
        tag="a"
        :href="withBase(article.regularPath)"
        :bordered="!isDark"
        :cut-corner="true"
        class="article-grid-card"
      >
        <div class="article-card-header">
          <h3 class="article-title">
            {{ article.frontMatter.title }}
          </h3>
          <p v-if="article.frontMatter.description" class="article-description">
            {{ article.frontMatter.description }}
          </p>
        </div>

        <div class="article-card-footer">
          <j-container gap="8px" style="flex-wrap: wrap;">
            <j-tag round :bordered="false" size="small" type="time">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14" fill="currentColor">
                  <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/>
                </svg>
              </template>
              {{ formatDate(article.frontMatter.date) }}
            </j-tag>

            <a
              v-for="(item, index2) in article.frontMatter.tags"
              :key="index2"
              :href="withBase(`/pages/tags.html?tag=${item}`)"
              @click.stop
            >
              <j-tag round :bordered="false" strong class="hover-pointer" type="info" size="small">
                <template #icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14" fill="currentColor">
                    <path d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"/>
                  </svg>
                </template>
                <span>{{ item }}</span>
              </j-tag>
            </a>
          </j-container>
        </div>
      </j-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { CustomThemeConfig, Post, TagColorType } from '../../type'
import JTag from './JTag.vue'
import JBadge from './JBadge.vue'
import JContainer from './JContainer.vue'
import JCard from './JCard.vue'

const props = defineProps<{
  data: Record<string, Post[]>
  selectedItem: string
  cardClass?: string
  dateFormat?: 'full' | 'short'
}>()

const emit = defineEmits<{
  'update:selectedItem': [value: string]
}>()

const { isDark } = useData<CustomThemeConfig>()

const tagColors: TagColorType[] = ['info', 'success', 'warning', 'error']
const getRandomTagColor = (index: number): TagColorType => {
    return tagColors[index % tagColors.length]
}

const toggleItem = (item: string) => {
    if (props.selectedItem === item) {
        emit('update:selectedItem', '')
        return
    }
    emit('update:selectedItem', item)
}

const formatDate = (date: string | undefined) => {
    if (!date) return ''
    return props.dateFormat === 'short' ? date.slice(0, 10) : date
}
</script>

<style scoped>
a {
    color: var(--vp-c-text-1);
    text-decoration: none;
}
</style>
