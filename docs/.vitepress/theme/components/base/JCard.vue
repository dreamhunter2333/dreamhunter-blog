<!-- 日系清新卡片组件 - Japanese Fresh Card Component -->
<template>
  <component
    :is="tag"
    :href="tag === 'a' ? href : undefined"
    :class="[
      'j-card',
      { 'j-card--hoverable': hoverable },
      { 'j-card--bordered': bordered },
      { 'j-card--cut-corner': cutCorner },
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
  cutCorner?: boolean
}>(), {
  tag: 'div'
})
</script>

<style scoped>
.j-card {
  background: var(--jp-card);
  border-radius: 8px;
  box-shadow: var(--jp-shadow-md);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  display: block;
  text-decoration: none;
  color: var(--vp-c-text-1);
  /* 液态玻璃效果 */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

:root.dark .j-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.j-card--bordered {
  border: 1px solid var(--vp-c-divider);
  box-shadow: var(--jp-shadow-md),
              inset 0 1px 0 rgba(255, 255, 255, 0.5),
              inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

:root.dark .j-card--bordered {
  box-shadow: var(--jp-shadow-md),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.j-card--small {
  border-radius: 6px;
}

.j-card--small .j-card__content {
  padding: 10px 14px;
}

/* 右上角二次元三角形切角 */
.j-card--cut-corner {
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
}

/* 三角形背景（淡粉色） */
.j-card--cut-corner::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, rgba(251, 114, 153, 0.8) 0%, rgba(251, 114, 153, 0.6) 100%);
  clip-path: polygon(100% 0, 100% 100%, 0 0);
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.j-card--cut-corner:hover::after {
  opacity: 1;
  transform: scale(1);
}

/* 扫描光线（淡粉色） */
.j-card--cut-corner::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: linear-gradient(
    135deg,
    transparent 20%,
    rgba(251, 114, 153, 0.9) 50%,
    transparent 80%
  );
  background-size: 300% 300%;
  background-position: 100% 100%;
  clip-path: polygon(100% 0, 100% 100%, 0 0);
  z-index: 3;
  pointer-events: none;
  opacity: 0;
}

.j-card--cut-corner:hover::before {
  opacity: 1;
  animation: cyber-scan 1.2s ease-in-out infinite;
}

@keyframes cyber-scan {
  0% { background-position: 100% 100%; }
  50% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}

/* 移除hover效果 */
.j-card--hoverable {
  cursor: pointer;
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
  padding: 18px 20px;
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
    border-radius: 6px;
  }

  .j-card__content {
    padding: 14px 16px;
  }
}
</style>
