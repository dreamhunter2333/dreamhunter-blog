<template>
    <ClientOnly>
        <n-config-provider :theme="naiveTheme">
            <n-card style="margin-bottom: 10px;">
                <n-space>
                    <n-tag @click="toggleCategory(key)" v-for="(item, key, index) in data" v-bind:key="index" strong
                        class="hover-pointer" :bordered="selectTag == key" :type="getRandomTagColor(index)">
                        {{ key }}
                        <n-badge :value="data[key].length" :type="getRandomTagColor(index)" />
                    </n-tag>
                </n-space>
            </n-card>
            <n-card v-if="selectCategory" :title="selectCategory">
                <n-list>
                    <n-list-item v-for="(article, index) in data[selectCategory]" :key="index">
                        <template #prefix>
                            <n-badge type="success" dot />
                        </template>
                        <a :href="withBase(article.regularPath)">
                            <div class="post-container">
                                <div class="post-dot"></div>
                                {{ article.frontMatter.title }}
                            </div>
                        </a>
                        <template #suffix>
                            <n-tag :bordered="false" type="info">
                                {{ article.frontMatter.date }}
                            </n-tag>
                        </template>
                    </n-list-item>
                </n-list>
            </n-card>
        </n-config-provider>
    </ClientOnly>
</template>
<script lang="ts" setup>
import { useData, withBase } from 'vitepress'
import { computed, ref } from 'vue'
import { initCategory } from '../functions'
import {
    NCard, NConfigProvider, darkTheme, NTag,
    NSpace, NBadge, NList, NListItem
} from "naive-ui";

const { isDark, theme } = useData()
const data = computed(() => initCategory(theme.value.posts))
const naiveTheme = computed(() => {
    return isDark.value ? darkTheme : null;
})
const selectCategory = ref('')
const tagColors = ['info', 'success', 'warning', 'error']
const getRandomTagColor = (index: number) => {
    return tagColors[index % tagColors.length]
}
const toggleCategory = (category: string) => {
    if (selectCategory.value == category) {
        selectCategory.value = ''
        return;
    }
    selectCategory.value = category;
}
</script>

<style scoped>
a {
    color: var(--vp-c-text-1);
    text-decoration: none;
}
</style>
