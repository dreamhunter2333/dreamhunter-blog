<!-- 日系清新时间轴项组件 - Japanese Fresh Timeline Item Component -->
<template>
  <div class="j-timeline-item">
    <div :class="['j-timeline-item__dot', type && `j-timeline-item__dot--${type}`]"></div>
    <div class="j-timeline-item__line"></div>
    <div class="j-timeline-item__content">
      <h3 v-if="title" class="j-timeline-item__title">{{ title }}</h3>
      <div class="j-timeline-item__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  type?: 'info' | 'success' | 'warning' | 'error'
}>()
</script>

<style scoped>
.j-timeline-item {
  position: relative;
  padding-bottom: 24px;
}

.j-timeline-item:last-child .j-timeline-item__line {
  display: none;
}

.j-timeline-item__dot {
  position: absolute;
  left: -32px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px var(--vp-c-bg);
  z-index: 2;
}

.j-timeline-item__dot--info {
  background: var(--vp-c-brand-1);
}

.j-timeline-item__dot--success {
  background: var(--jp-accent);
}

.j-timeline-item__dot--warning {
  background: var(--jp-lemon);
}

.j-timeline-item__dot--error {
  background: var(--jp-peach);
}

.j-timeline-item__line {
  position: absolute;
  left: -26px;
  top: 18px;
  width: 2px;
  height: calc(100% - 6px);
  background: linear-gradient(180deg, var(--vp-c-brand-1) 0%, var(--jp-accent) 100%);
  opacity: 0.3;
  z-index: 1;
}

.j-timeline-item__title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.j-timeline-item__body {
  color: var(--vp-c-text-1);
}
</style>
