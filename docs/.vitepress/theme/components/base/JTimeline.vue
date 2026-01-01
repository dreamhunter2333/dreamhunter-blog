<!-- 日系清新时间轴组件 - Japanese Fresh Timeline Component -->
<template>
  <div class="j-timeline">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  size?: 'small' | 'medium' | 'large'
}>()
</script>

<style scoped>
.j-timeline {
  position: relative;
  padding-left: 32px;
}
</style>
