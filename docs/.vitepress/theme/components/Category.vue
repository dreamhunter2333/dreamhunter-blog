<template>
  <ClientOnly>
    <n-config-provider :theme="naiveTheme">
      <n-card
        size="small" :bordered="!isDark" style="margin-bottom: 10px;"
        :title="$frontmatter.title || 'Categories'"
      >
        <n-space>
          <n-tag
            v-for="(item, key, index) in data" :key="index" round strong
            class="hover-pointer" :checkable="selectCategory == key" :checked="selectCategory == key" :type="getRandomTagColor(index)"
            @click="toggleCategory(key)"
          >
            {{ key }}
            <n-badge :value="data[key].length" :type="getRandomTagColor(index)" />
          </n-tag>
        </n-space>
      </n-card>
      <n-card v-if="selectCategory" size="small" :bordered="!isDark" :title="selectCategory">
        <n-list>
          <n-list-item v-for="(article, index) in data[selectCategory]" :key="index">
            <template #prefix>
              <n-badge type="success" dot />
            </template>
            <div>
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
    NCard, NConfigProvider, NTag,
    NSpace, NBadge, NList, NListItem, NIcon
} from "naive-ui";
import { Clock } from '@vicons/fa'
import { useNaiveTheme } from '../utils/composables';
import { CustomThemeConfig, Post } from '../type';

const { isDark, theme } = useData<CustomThemeConfig>()
const naiveTheme = useNaiveTheme()
const data = computed(() => {
    const tmpData: Record<string, Post[]> = {}
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
