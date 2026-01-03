<template>
  <j-tag-list
    :data="data"
    v-model:selected-item="selectCategory"
    card-class="category-card"
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

</style>
