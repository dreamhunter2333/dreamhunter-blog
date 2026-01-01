<!-- 日系清新网格项组件 - Japanese Fresh Grid Item Component -->
<template>
  <div class="j-grid-item" :style="itemStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  span?: number
}>()

const itemStyle = computed(() => {
  if (props.span) {
    return {
      gridColumn: `span ${props.span}`
    }
  }
  return {}
})
</script>

<style scoped>
.j-grid-item {
  min-width: 0;
}
</style>
