<!-- 日系清新徽章组件 - Japanese Fresh Badge Component -->
<template>
  <span class="j-badge">
    <slot></slot>
    <span v-if="dot" :class="['j-badge__dot', type && `j-badge__dot--${type}`]"></span>
    <span v-else-if="value" :class="['j-badge__value', type && `j-badge__value--${type}`]">
      {{ value }}
    </span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  value?: string | number
  dot?: boolean
  type?: 'info' | 'success' | 'warning' | 'error'
}>()
</script>

<style scoped>
.j-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.j-badge__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 6px;
  background: var(--vp-c-brand-1);
}

.j-badge__value {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  margin-left: 6px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  background: var(--vp-c-brand-1);
  color: white;
}

/* 类型颜色 */
.j-badge__dot--success,
.j-badge__value--success {
  background: var(--jp-accent);
}

.j-badge__dot--warning {
  background: var(--jp-lemon);
}

.j-badge__value--warning {
  background: #E8C870;
  color: #5A4A20;
}

.j-badge__dot--error {
  background: var(--jp-peach);
}

.j-badge__value--error {
  background: #E8A870;
  color: #5A3A20;
}
</style>
