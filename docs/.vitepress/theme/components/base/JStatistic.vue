<!-- 日系清新统计数字组件 - Japanese Fresh Statistic Component -->
<template>
  <div class="j-statistic">
    <div class="j-statistic__label">{{ label }}</div>
    <div class="j-statistic__value">{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
}>()
</script>

<style scoped>
.j-statistic {
  text-align: center;
  padding: 8px;
}

.j-statistic__label {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  font-weight: 500;
}

.j-statistic__value {
  font-size: 28px;
  font-weight: 700;
  background: var(--jp-gradient-button);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
