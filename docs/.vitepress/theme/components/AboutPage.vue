<template>
  <ClientOnly>
    <j-grid style="width: 100%; margin-top: 12px; margin-bottom: 12px;" :cols="showSide ? 4 : 1" gap="12px">
      <j-grid-item v-if="showSide" :span="3" :order="1">
        <j-card :bordered="!isDark" style="width: 100%; height: 100%;">
          <div style="padding: 24px;">
            <h1 style="margin: 0 0 24px 0; font-size: 28px; color: var(--vp-c-text-1);">留言板</h1>
            <p style="color: var(--vp-c-text-2); line-height: 1.8; margin: 0;">
              欢迎留言交流！
            </p>
          </div>
        </j-card>
      </j-grid-item>
      <j-grid-item :span="showSide ? 1 : 1" :order="showSide ? 2 : 1">
        <div :style="showSide ? 'position: sticky; top: calc(var(--vp-nav-height) + 12px); height: 100%;' : ''">
          <About :style="showSide ? 'height: 100%;' : ''" />
        </div>
      </j-grid-item>
    </j-grid>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useIsMobile } from '../utils/composables'
import { CustomThemeConfig } from '../type'
import About from './About.vue'
import JCard from './base/JCard.vue'
import JGrid from './base/JGrid.vue'
import JGridItem from './base/JGridItem.vue'

const isMobile = useIsMobile()
const { theme, isDark } = useData<CustomThemeConfig>()

const showSide = computed(() => !isMobile.value && theme.value.about)
</script>

<style scoped>
</style>
