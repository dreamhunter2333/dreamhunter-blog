<template>
    <ClientOnly>
        <n-config-provider :theme="naiveTheme">
            <n-card size="small" :bordered="!isDark" style="margin-bottom: 10px;"
                :title="$frontmatter.title || 'Categories'">
                <n-space>
                    <n-tag round @click="toggleCategory(key)" v-for="(item, key, index) in data" v-bind:key="index"
                        strong class="hover-pointer" :checkable="selectCategory == key" :checked="selectCategory == key"
                        :type="getRandomTagColor(index)">
                        {{ key }}
                        <n-badge :value="data[key].length" :type="getRandomTagColor(index)" />
                    </n-tag>
                </n-space>
            </n-card>
            <n-card size="small" :bordered="!isDark" v-if="selectCategory" :title="selectCategory">
                <n-list>
                    <n-list-item v-for="(article, index) in data[selectCategory]" :key="index">
                        <template #prefix>
                            <n-badge type="success" dot />
                        </template>
                        <div class="hover-title">
                            <a :href="withBase(article.regularPath)">
                                {{ article.frontMatter.title }}
                            </a>
                        </div>
                        <template #suffix>
                            <n-tag round :bordered="false" type="info">
                                <template #icon>
                                    <n-icon size="15" :component="Clock" />
                                </template>
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
import {
    NCard, NConfigProvider, darkTheme, NTag,
    NSpace, NBadge, NList, NListItem, NIcon
} from "naive-ui";
import { Clock } from '@vicons/fa'
import { CustomThemeConfig } from '../type';
const { isDark, theme } = useData<CustomThemeConfig>()
const data = computed(() => {
    const tmpData: any = {}
    for (const element of theme.value.posts) {
        const categories = element.frontMatter.categories;
        if (!categories) continue;
        const tmpCategories = Array.isArray(categories) ? categories : [categories]
        tmpCategories.forEach((item) => {
            if (!tmpData[item]) {
                tmpData[item] = []
            }
            tmpData[item].push(element)
        })
    }
    return tmpData;
});
const naiveTheme = computed(() => isDark.value ? darkTheme : null)
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

a:hover {
    color: var(--vp-c-text-1);
}
</style>
