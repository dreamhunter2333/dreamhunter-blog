<!-- 标签/分类列表共享组件 - Shared Tag/Category List Component -->
<template>
  <div>
    <j-card
      size="small" :bordered="!isDark" :class="cardClass"
      :title="title"
    >
      <j-container gap="12">
        <j-tag
          v-for="(item, key, index) in data" :key="index" round strong
          class="hover-pointer" :checkable="selectedItem == key" :checked="selectedItem == key" :type="getRandomTagColor(index)"
          @click="toggleItem(key)"
        >
          {{ key }}
          <template #suffix>
            <j-badge :value="data[key].length" :type="getRandomTagColor(index)" />
          </template>
        </j-tag>
      </j-container>
    </j-card>
    <j-card v-if="selectedItem" size="small" :bordered="!isDark" :title="selectedItem">
      <div class="article-list">
        <j-article-item
          v-for="(article, index) in data[selectedItem]" :key="index"
          :href="withBase(article.regularPath)"
          :title="article.frontMatter.title"
          :date="formatDate(article.frontMatter.date)"
          dot
          dot-type="success"
        />
      </div>
    </j-card>
  </div>
</template>

<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { CustomThemeConfig, Post, TagColorType } from '../../type'
import JCard from './JCard.vue'
import JTag from './JTag.vue'
import JBadge from './JBadge.vue'
import JContainer from './JContainer.vue'
import JArticleItem from './JArticleItem.vue'

const props = defineProps<{
  data: Record<string, Post[]>
  selectedItem: string
  cardClass?: string
  title: string
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
