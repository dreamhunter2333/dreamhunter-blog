<template>
  <j-tag-list
    :data="data"
    v-model:selected-item="selectTag"
    card-class="tags-card"
    :title="title"
    date-format="full"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { CustomThemeConfig, Post } from '../type'
import JTagList from './base/JTagList.vue'

const { theme, frontmatter } = useData<CustomThemeConfig>()

const title = computed(() => frontmatter.value.title || 'Tags')

const data = computed(() => {
    const tmpData: Record<string, Post[]> = {}
    for (const element of theme.value.posts) {
        const tags = element.frontMatter.tags
        if (!tags) continue
        tags.forEach((item) => {
            if (!tmpData[item]) {
                tmpData[item] = []
            }
            tmpData[item].push(element)
        })
    }
    return tmpData
})

const selectTag = ref('')

onMounted(() => {
    const url = location ? location?.href?.split('?')[1] : ''
    const params = new URLSearchParams(url)
    if (params.get('tag')) {
        selectTag.value = params.get('tag') as string
    }
})
</script>

<style scoped>
.tags-card {
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
