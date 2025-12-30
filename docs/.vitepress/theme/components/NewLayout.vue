<template>
  <Layout>
    <template #doc-before>
      <ClientOnly>
        <n-config-provider :theme="naiveTheme">
          <n-flex v-if="!$frontmatter.page" style="margin: 12px 0 12px 0;">
            <n-tag round :bordered="false">
              <template #icon>
                <n-icon size="15" :component="Clock" />
              </template>
              {{ $frontmatter.date?.substring(0, 10) }}
            </n-tag>
            <a
              v-for="(item, index2) in $frontmatter.tags" :key="index2"
              :href="withBase(`/pages/tags.html?tag=${item}`)"
            >
              <n-tag round :bordered="false" strong class="hover-pointer" type="info">
                <span>{{ item }}</span>
                <template #icon>
                  <n-icon size="15" :component="Tag" />
                </template>
              </n-tag>
            </a>
          </n-flex>
        </n-config-provider>
      </ClientOnly>
    </template>
    <template #doc-after>
      <ClientOnly>
        <div :key="giscusKey">
          <Giscus
            id="comments" repo="dreamhunter2333/dreamhunter-blog"
            repo-id="MDEwOlJlcG9zaXRvcnkzMzIyNTA3MTc=" category="General" category-id="DIC_kwDOE82-Xc4CgbBf"
            mapping="pathname" reactions-enabled="1" emit-metadata="0" input-position="top"
            :theme="isDark ? 'dark' : 'light'" lang="zh-CN" loading="lazy"
          />
        </div>
      </ClientOnly>
    </template>
  </Layout>
</template>
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from "vitepress";
import Giscus from '@giscus/vue';
import { computed } from 'vue';
import { NConfigProvider, NTag, NFlex, NIcon } from "naive-ui";
import { Clock, Tag } from '@vicons/fa';
import { useNaiveTheme } from '../utils/composables';

const { isDark, frontmatter } = useData();
const { Layout } = DefaultTheme;
const naiveTheme = useNaiveTheme();
const giscusKey = computed(() => {
    return `${frontmatter.value.title}-${frontmatter.value.date}-${frontmatter.value?.tags?.join('')}`;
})
</script>
