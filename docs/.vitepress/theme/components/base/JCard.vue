<!-- 日系清新卡片组件 - Japanese Fresh Card Component -->
<template>
  <component
    :is="tag"
    :href="tag === 'a' ? href : undefined"
    :class="[
      'j-card',
      { 'j-card--hoverable': hoverable },
      { 'j-card--bordered': bordered },
      size && `j-card--${size}`
    ]"
  >
    <div v-if="title || $slots.header" class="j-card__header">
      <slot name="header">
        <h3 class="j-card__title">{{ title }}</h3>
      </slot>
    </div>
    <div class="j-card__content">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="j-card__footer">
      <slot name="footer"></slot>
    </div>
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  tag?: string
  href?: string
  title?: string
  size?: 'small' | 'medium' | 'large'
  hoverable?: boolean
  bordered?: boolean
}>(), {
  tag: 'div'
})
</script>

<style scoped>
.j-card {
  background: var(--jp-card);
  border-radius: 20px;
  box-shadow: var(--jp-shadow-md);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
  position: relative;
  display: block;
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.j-card--bordered {
  border: 1px solid var(--vp-c-divider);
}

.j-card--small {
  border-radius: 16px;
}

.j-card--small .j-card__content {
  padding: 12px 16px;
}

/* 顶部渐变装饰 */
.j-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 4px;
  background: var(--jp-gradient-hero);
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* 光晕效果 */
.j-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(232, 154, 171, 0.08) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

:root.dark .j-card::after {
  background: radial-gradient(
    circle at center,
    rgba(255, 154, 184, 0.12) 0%,
    transparent 50%
  );
}

.j-card--hoverable:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: var(--jp-shadow-hover);
  cursor: pointer;
}

.j-card--hoverable:hover::before {
  opacity: 1;
}

.j-card--hoverable:hover::after {
  opacity: 1;
}

.j-card__header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: linear-gradient(135deg,
    var(--vp-c-bg-soft) 0%,
    transparent 100%
  );
}

.j-card__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.j-card__content {
  padding: 20px 24px;
  position: relative;
  z-index: 1;
}

.j-card__footer {
  padding: 16px 24px 20px;
  border-top: 1px solid var(--vp-c-divider);
  background: linear-gradient(135deg,
    transparent 0%,
    var(--vp-c-bg-soft) 100%
  );
}

@media (max-width: 960px) {
  .j-card {
    border-radius: 16px;
  }

  .j-card__content {
    padding: 16px 20px;
  }
}
</style>
