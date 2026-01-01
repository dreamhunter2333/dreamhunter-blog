<!-- 日系清新网格组件 - Japanese Fresh Grid Component -->
<template>
  <div class="j-grid" :style="gridStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  cols?: number
  gap?: string
}>()

const gridStyle = computed(() => {
  const style: Record<string, string> = {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.cols || 1}, 1fr)`
  }

  if (props.gap) {
    style.gap = props.gap
  }

  return style
})
</script>

<style scoped>
.j-grid {
  width: 100%;
}
</style>
