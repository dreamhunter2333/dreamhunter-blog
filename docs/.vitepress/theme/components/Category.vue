<template>
  <j-tag-list
    :data="data"
    v-model:selected-item="selectCategory"
    card-class="category-card"
    :title="title"
    date-format="short"
  />
</template>

<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import { CustomThemeConfig, Post } from '../type'
import JTagList from './base/JTagList.vue'

const { theme, frontmatter } = useData<CustomThemeConfig>()

const title = computed(() => frontmatter.value.title || 'Categories')

const data = computed(() => {
    const tmpData: Record<string, Post[]> = {}
    for (const element of theme.value.posts) {
        const categories = element.frontMatter.categories
        if (!categories) continue
        const tmpCategories = Array.isArray(categories) ? categories : [categories]
        tmpCategories.forEach((item) => {
            if (!tmpData[item]) {
                tmpData[item] = []
            }
            tmpData[item].push(element)
        })
    }
    return tmpData
})

const selectCategory = ref('')
</script>

<style scoped>
.category-card {
    margin-bottom: var(--theme-card-spacing);
}

:deep(.j-tag) {
    font-size: var(--theme-tag-font-size);
    padding: var(--theme-tag-padding);
    transition: var(--theme-transition-spring);
}

:deep(.j-tag:hover) {
    transform: translateY(-2px) scale(1.05);
    will-change: transform;
}

:deep(.j-tag--checked) {
    transform: scale(1.08);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

:deep(.j-tag--checked:hover) {
    transform: translateY(-2px) scale(1.08);
}
</style>
