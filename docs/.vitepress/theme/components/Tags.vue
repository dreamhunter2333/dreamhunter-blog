<template>
    <ClientOnly>
        <n-config-provider :theme="naiveTheme">
            <n-card embedded :bordered="false" style="margin-bottom: 10px;" :title="$frontmatter.title || 'Categories'">
                <n-space>
                    <n-tag @click="toggleTag(key)" v-for="(item, key, index) in data" v-bind:key="index" strong
                        class="hover-pointer" :checkable="selectTag == key" :checked="selectTag == key"
                        :bordered="false" :type="getRandomTagColor(index)">
                        {{ key }}
                        <n-badge :value="data[key].length" :type="getRandomTagColor(index)" />
                    </n-tag>
                </n-space>
            </n-card>
            <n-card embedded :bordered="false" v-if="selectTag" :title="selectTag">
                <n-list>
                    <n-list-item v-for="(article, index) in data[selectTag]" :key="index">
                        <template #prefix>
                            <n-badge type="success" dot />
                        </template>
                        <a :href="withBase(article.regularPath)">
                            {{ article.frontMatter.title }}
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
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import {
    NCard, NConfigProvider, darkTheme, NTag,
    NSpace, NBadge, NList, NListItem
} from "naive-ui";
import { CustomThemeConfig, Post } from '../type';

const { isDark, theme } = useData<CustomThemeConfig>()

const naiveTheme = computed(() => isDark.value ? darkTheme : null)
const tagColors = ['info', 'success', 'warning', 'error']
const getRandomTagColor = (index: number) => {
    return tagColors[index % tagColors.length]
}

let url = location.href.split('?')[1]
let params = new URLSearchParams(url)

const data = computed(() => {
    const tmpData: Record<string, Post[]> = {}
    for (const element of theme.value.posts) {
        const tags = element.frontMatter.tags;
        if (!tags) continue;
        tags.forEach((item) => {
            if (!tmpData[item]) {
                tmpData[item] = []
            }
            tmpData[item].push(element)
        })
    }
    return tmpData;
})
const selectTag = ref(params.get('tag') ? params.get('tag') : '')

const toggleTag = (tag: string) => {
    if (selectTag.value == tag) {
        selectTag.value = ''
        return;
    }
    selectTag.value = tag;
}
</script>

<style scoped>
a {
    color: var(--vp-c-text-1);
    text-decoration: none;
}
</style>
