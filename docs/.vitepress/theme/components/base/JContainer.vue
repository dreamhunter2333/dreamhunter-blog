<!-- 日系清新布局容器组件 - Japanese Fresh Container Component -->
<template>
  <div :class="['j-container', direction && `j-container--${direction}`]" :style="containerStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  direction?: 'row' | 'column'
  gap?: string | number
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
  align?: 'start' | 'center' | 'end' | 'stretch'
}>()

const containerStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.gap) {
    style.gap = typeof props.gap === 'number' ? `${props.gap}px` : props.gap
  }

  if (props.justify) {
    const justifyMap = {
      'start': 'flex-start',
      'center': 'center',
      'end': 'flex-end',
      'space-between': 'space-between',
      'space-around': 'space-around'
    }
    style.justifyContent = justifyMap[props.justify]
  }

  if (props.align) {
    const alignMap = {
      'start': 'flex-start',
      'center': 'center',
      'end': 'flex-end',
      'stretch': 'stretch'
    }
    style.alignItems = alignMap[props.align]
  }

  return style
})
</script>

<style scoped>
.j-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px; /* 默认间距 */
}

.j-container--row {
  flex-direction: row;
}

.j-container--column {
  flex-direction: column;
}
</style>
