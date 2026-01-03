<template>
  <div class="archives-container">
    <!-- 按年分组 -->
    <div v-for="yearData in timelineGroups" :key="yearData.year" class="year-section">
      <!-- 年份标题 -->
      <div class="year-header">
        <div class="year-dot"></div>
        <h2 class="year-title">{{ yearData.year }}</h2>
      </div>

      <!-- 按月分组 -->
      <div v-for="monthData in yearData.months" :key="monthData.month" class="month-section">
        <!-- 月份标题 -->
        <div class="month-header">
          <div class="month-dot"></div>
          <h3 class="month-title">{{ monthData.month }}</h3>
        </div>

        <!-- 文章网格 -->
        <div class="article-grid-container">
          <j-card
            v-for="(article, index) in monthData.articles"
            :key="index"
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
                  v-for="(tag, tagIndex) in article.frontMatter.tags"
                  :key="tagIndex"
                  :href="withBase(`/pages/tags.html?tag=${tag}`)"
                  @click.stop
                >
                  <j-tag round :bordered="false" strong class="hover-pointer" type="info" size="small">
                    <template #icon>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14" fill="currentColor">
                        <path d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"/>
                      </svg>
                    </template>
                    <span>{{ tag }}</span>
                  </j-tag>
                </a>
              </j-container>
            </div>
          </j-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { Post } from '../type'
import JCard from './base/JCard.vue'
import JTag from './base/JTag.vue'
import JContainer from './base/JContainer.vue'

const { theme } = useData()
const { isDark } = useData()

const monthNames = ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']

// 先按年分组，再按月分组（倒序）
const timelineGroups = computed(() => {
    const yearGroups: Record<string, Record<string, Post[]>> = {}

    for (const article of theme.value.posts) {
        if (!article.frontMatter?.date) continue

        const dateParts = article.frontMatter.date.split('-')
        const year = dateParts[0]
        const monthIndex = parseInt(dateParts[1]) - 1
        const month = monthNames[monthIndex]

        if (!yearGroups[year]) {
            yearGroups[year] = {}
        }
        if (!yearGroups[year][month]) {
            yearGroups[year][month] = []
        }
        yearGroups[year][month].push(article)
    }

    // 对年份倒序排序，对月份倒序排序
    const sortedYears = Object.keys(yearGroups).sort((a, b) => parseInt(b) - parseInt(a))
    const result: Array<{ year: string, months: Array<{ month: string, articles: Post[] }> }> = []

    for (const year of sortedYears) {
        // 对月份倒序排序
        const monthKeys = Object.keys(yearGroups[year])
        const sortedMonths = monthKeys.sort((a, b) => {
            const aIndex = monthNames.indexOf(a)
            const bIndex = monthNames.indexOf(b)
            return bIndex - aIndex
        })

        const monthsData = sortedMonths.map(month => ({
            month,
            // 对每个月的文章按日期倒序排序
            articles: yearGroups[year][month].sort((a, b) => {
                return (b.frontMatter.date || '').localeCompare(a.frontMatter.date || '')
            })
        }))

        result.push({ year, months: monthsData })
    }

    return result
})
</script>

<style scoped>
a {
    color: var(--vp-c-text-1);
    text-decoration: none;
}

/* 归档容器 */
.archives-container {
  margin-top: 32px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  position: relative;
}

/* 时间轴背景线 */
.archives-container::before {
  content: '';
  position: absolute;
  left: 26px; /* 调整为26px，使线的中心(27px)与点的中心对齐 */
  top: 8px;
  bottom: 20px;
  width: 2px;
  background: linear-gradient(to bottom,
    var(--vp-c-brand-1) 0%,
    var(--vp-c-brand-2) 50%,
    var(--vp-c-brand-3) 100%
  );
  opacity: 0.25;
  z-index: 0;
}

/* 年份分组 */
.year-section {
  margin-bottom: 24px;
  position: relative;
}

/* 年份标题 */
.year-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
  padding-left: 20px;
}

.year-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px var(--vp-c-bg), 0 0 0 6px var(--vp-c-brand-soft);
  flex-shrink: 0;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.year-title {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-left: 30px !important;
  border: none !important;
}

/* 月份分组 */
.month-section {
  margin-bottom: 16px;
}

/* 月份标题 */
.month-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
  padding-left: 20px;
}

.month-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--jp-bilibili-blue);
  box-shadow: 0 0 0 4px var(--vp-c-bg), 0 0 0 5px var(--jp-bilibili-blue-soft);
  flex-shrink: 0;
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.month-title {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 18px;
  font-weight: 600;
  color: var(--jp-bilibili-blue);
  margin-left: 30px !important;
  border: none !important;
}

/* 文章网格容器 - 三列布局，左边距适配时间轴 */
.article-grid-container {
  margin-left: 54px;
}

/* 响应式布局 */
@media (max-width: 960px) {
  .archives-container {
    margin-top: 32px;
    padding: 0 12px;
  }

  .year-title {
    font-size: 22px;
  }

  .month-title {
    font-size: 16px;
  }
}

@media (max-width: 640px) {
  .article-grid-container {
    margin-left: 48px;
  }

  .archives-container {
    padding: 0 8px;
  }

  .archives-container::before {
    left: 17px; /* 调整为17px，使线的中心(18px)与点的中心对齐 */
  }

  .year-header {
    padding-left: 12px;
  }

  .month-header {
    padding-left: 12px;
  }

  .year-dot {
    width: 12px;
    height: 12px;
    box-shadow: 0 0 0 3px var(--vp-c-bg), 0 0 0 4px var(--vp-c-brand-soft);
    left: 4px;
  }

  .month-dot {
    width: 8px;
    height: 8px;
    box-shadow: 0 0 0 3px var(--vp-c-bg), 0 0 0 4px var(--jp-bilibili-blue-soft);
    left: 6px;
  }

  .year-title {
    font-size: 20px;
    margin-left: 26px;
  }

  .month-title {
    font-size: 14px;
    margin-left: 26px;
  }
}
</style>
