<!-- 日系清新标签组件 - Japanese Fresh Tag Component -->
<template>
  <span
    :class="[
      'j-tag',
      type && `j-tag--${type}`,
      size && `j-tag--${size}`,
      { 'j-tag--round': round },
      { 'j-tag--checkable': checkable },
      { 'j-tag--checked': checked },
      { 'j-tag--bordered': bordered }
    ]"
    @click="handleClick"
  >
    <span v-if="$slots.icon" class="j-tag__icon">
      <slot name="icon"></slot>
    </span>
    <span class="j-tag__content">
      <slot></slot>
    </span>
    <slot name="suffix"></slot>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: 'info' | 'success' | 'warning' | 'error' | 'time'
  round?: boolean
  checkable?: boolean
  checked?: boolean
  bordered?: boolean
  strong?: boolean
  size?: 'small' | 'medium'
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<style scoped>
.j-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: default;
  user-select: none;
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.j-tag--round {
  border-radius: 16px;
}

.j-tag--small {
  padding: 4px 10px;
  font-size: 12px;
  gap: 4px;
}

.j-tag--small .j-tag__icon {
  font-size: 12px;
}

.j-tag--checkable {
  cursor: pointer;
}

.j-tag--checkable:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.j-tag__icon {
  display: inline-flex;
  align-items: center;
  font-size: 15px;
}

.j-tag__content {
  line-height: 1;
}

/* 亮色模式标签颜色 */
:root:not(.dark) .j-tag--info {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

:root:not(.dark) .j-tag--success {
  border-color: var(--jp-accent);
  color: var(--jp-accent);
}

:root:not(.dark) .j-tag--warning {
  border-color: var(--jp-lemon);
  color: var(--jp-lemon-text);
}

:root:not(.dark) .j-tag--error {
  border-color: var(--jp-peach);
  color: var(--jp-peach-text);
}

:root:not(.dark) .j-tag--time {
  border-color: var(--jp-bilibili-blue);
  color: var(--jp-bilibili-blue);
}

/* 暗色模式标签颜色 */
:root.dark .j-tag--info {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

:root.dark .j-tag--success {
  border-color: var(--jp-accent);
  color: var(--jp-accent);
}

:root.dark .j-tag--warning {
  border-color: var(--jp-lemon);
  color: var(--jp-lemon);
}

:root.dark .j-tag--error {
  border-color: var(--jp-peach);
  color: var(--jp-peach);
}

:root.dark .j-tag--time {
  border-color: var(--jp-bilibili-blue);
  color: var(--jp-bilibili-blue);
}

/* 选中状态 - 亮色模式 */
:root:not(.dark) .j-tag--checked {
  background: var(--vp-c-brand-accessible);
  border-color: var(--vp-c-brand-accessible);
  color: #FFFFFF;
  font-weight: 600;
}

:root:not(.dark) .j-tag--checked:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  color: #FFFFFF;
}

/* 选中状态 - 暗色模式 */
:root.dark .j-tag--checked {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #1E1E1E;
  font-weight: 600;
}

:root.dark .j-tag--checked:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  color: #1E1E1E;
}
</style>
