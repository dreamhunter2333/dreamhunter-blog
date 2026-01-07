<template>
  <ClientOnly>
    <div class="about-container">
      <div class="about-layout">
        <div class="about-main">
          <div class="giscus-wrapper">
            <Giscus
              id="comments"
              repo="dreamhunter2333/dreamhunter-blog"
              repo-id="MDEwOlJlcG9zaXRvcnkzMzIyNTA3MTc="
              category="General"
              category-id="DIC_kwDOE82-Xc4CgbBf"
              mapping="pathname"
              reactions-enabled="1"
              emit-metadata="0"
              input-position="top"
              :theme="isDark ? 'dark' : 'light'"
              lang="zh-CN"
              loading="lazy"
            />
          </div>
        </div>

        <aside class="about-sidebar">
          <div class="about-card">
            <div class="about-avatar-section">
              <div class="avatar-wrapper">
                <img :src="member?.avatar" :alt="member?.name" class="avatar" />
              </div>
              <div class="about-name">{{ member?.name }}</div>
              <div class="about-links">
                <a
                  v-for="(link, index) in member?.links"
                  :key="index"
                  :href="link.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="about-link-item"
                  :title="link.icon"
                >
                  <component :is="getIcon(link.icon)" class="link-icon" />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed, h } from 'vue'
import { useData } from 'vitepress'
import { CustomThemeConfig } from '../type'
import Giscus from '@giscus/vue'

const { theme, isDark } = useData<CustomThemeConfig>()
const member = computed(() => theme.value.about)

const getIcon = (icon: string) => {
  const iconMap: Record<string, any> = {
    github: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 496 512',
      fill: 'currentColor'
    }, [
      h('path', {
        d: 'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'
      })
    ]),
    twitter: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 512 512',
      fill: 'currentColor'
    }, [
      h('path', {
        d: 'M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z'
      })
    ])
  }

  return iconMap[icon] || iconMap.github
}
</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 2rem;
}

.about-layout {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.about-main {
  flex: 1;
  min-width: 0;
}

.about-sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: calc(var(--vp-nav-height) + 1rem);
}

.about-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 2rem 1.5rem;
  transition: all 0.2s ease;
}

.about-avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.2s ease;
}

.avatar:hover {
  border-color: var(--vp-c-brand-1);
}

.about-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem 0;
}

.about-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.about-link-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  position: relative;
  overflow: hidden;
}

.about-link-item::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: var(--vp-c-brand-1);
  transition: width 0.3s ease;
}

.about-link-item:hover {
  color: var(--vp-c-brand-1);
}

.about-link-item:hover::after {
  width: 100%;
}

.link-icon {
  width: 16px;
  height: 16px;
}

.giscus-wrapper {
  width: 100%;
  margin-top: 1.5rem;
}

@media (max-width: 960px) {
  .about-layout {
    flex-direction: column-reverse;
  }

  .about-main {
    width: 100%;
  }

  .about-sidebar {
    width: 100%;
    position: static;
    margin-bottom: 2rem;
  }

  .about-card {
    padding: 1.5rem;
  }

  .giscus-wrapper {
    margin-top: 0;
  }
}

@media (max-width: 768px) {
  .about-container {
    padding: 0 1rem 1.5rem;
  }

  .about-card {
    padding: 1.25rem;
  }

  .avatar {
    width: 64px;
    height: 64px;
  }

  .about-name {
    font-size: 1rem;
  }

  .about-link-item {
    width: 36px;
    height: 36px;
  }

  .link-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
