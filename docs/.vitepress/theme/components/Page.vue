<template>
  <ClientOnly>
    <j-grid style="width: 100%; margin-top: 24px;" :cols="showSide ? 4 : 3" gap="24px">
      <j-grid-item :span="showSide ? 3 : 3">
        <!-- 文章卡片网格 - 自适应排列 -->
        <div class="article-grid-container">
          <j-card
            v-for="(article, index) in curPosts" :key="index"
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
                  {{ article.frontMatter.date?.slice(0, 10) }}
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

        <j-container justify="center" style="margin-top: 32px;">
          <j-pagination v-model:page="pageNum" :page-count="pageCount" />
        </j-container>
      </j-grid-item>
      <j-grid-item v-if="showSide" style="width: 100%;">
        <div style="position: sticky; top: calc(var(--vp-nav-height) + 12px); ">
          <About />
          <j-card :bordered="!isDark" style="width: 100%; margin-top: 12px;">
            <j-container justify="space-around" gap="large">
              <j-statistic label="Posts" :value="posts.length" />
              <j-statistic label="Tags" :value="tags.length" />
            </j-container>
          </j-card>
        </div>
      </j-grid-item>
    </j-grid>
    <SakanaWidgetPlugin v-if="!isMobile" />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { useIsMobile } from '../utils/composables'
import { CustomThemeConfig, Post } from '../type'
import About from './About.vue'
import SakanaWidgetPlugin from './SakanaWidgetPlugin.vue'
import JCard from './base/JCard.vue'
import JTag from './base/JTag.vue'
import JContainer from './base/JContainer.vue'
import JPagination from './base/JPagination.vue'
import JStatistic from './base/JStatistic.vue'
import JGrid from './base/JGrid.vue'
import JGridItem from './base/JGridItem.vue'

const isMobile = useIsMobile()
const { theme, isDark } = useData<CustomThemeConfig>()

const showSide = computed(() => !isMobile.value && theme.value.about)

const posts = theme.value.posts
const tags = theme.value.posts.map(
    (item: Post) => item.frontMatter.tags
).flat().filter(
    (item, index, arr) => arr.indexOf(item) === index
)

const pageSize = 12
const pageNum = ref(1)
const pageCount = computed(() => Math.ceil(posts.length / pageSize))
const curPosts = computed(() =>
    posts.slice(pageSize * (pageNum.value - 1), pageSize * pageNum.value)
)
</script>

<style scoped>
a {
    color: var(--vp-c-text-1);
    text-decoration: none;
}

/* 固定两列网格容器 - 覆盖全局三列 */
.article-grid-container {
  grid-template-columns: repeat(2, 1fr);
  margin-top: 0;
  margin-bottom: 32px;
}

/* 响应式布局 */
@media (max-width: 640px) {
  .article-grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
