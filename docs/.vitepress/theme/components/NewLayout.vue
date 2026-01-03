<template>
  <div class="sakura-background">
    <svg class="sakura-svg">
      <defs>
        <!-- 二次元樱花花瓣 - 更小巧精致的五瓣形状 -->
        <path id="petal" d="M 0,0 Q -1.2,-1.2 -0.9,-3 Q 0,-4 0,-4.5 Q 0,-4 0.9,-3 Q 1.2,-1.2 0,0 Z" fill="rgba(251, 114, 153, 0.4)" stroke="rgba(251, 114, 153, 0.6)" stroke-width="0.15"/>

        <!-- 完整樱花 - 5个花瓣 + 花蕊 -->
        <g id="sakura">
          <use href="#petal" transform="rotate(0)" />
          <use href="#petal" transform="rotate(72)" />
          <use href="#petal" transform="rotate(144)" />
          <use href="#petal" transform="rotate(216)" />
          <use href="#petal" transform="rotate(288)" />
          <!-- 花蕊 -->
          <circle cx="0" cy="0" r="0.8" fill="rgba(251, 114, 153, 0.6)" />
          <circle cx="0" cy="0" r="0.4" fill="rgba(255, 255, 255, 0.8)" />
        </g>
      </defs>

      <!-- 更多樱花实例 - 20朵 -->
      <use href="#sakura" class="sakura-1" />
      <use href="#sakura" class="sakura-2" />
      <use href="#sakura" class="sakura-3" />
      <use href="#sakura" class="sakura-4" />
      <use href="#sakura" class="sakura-5" />
      <use href="#sakura" class="sakura-6" />
      <use href="#sakura" class="sakura-7" />
      <use href="#sakura" class="sakura-8" />
      <use href="#sakura" class="sakura-9" />
      <use href="#sakura" class="sakura-10" />
      <use href="#sakura" class="sakura-11" />
      <use href="#sakura" class="sakura-12" />
      <use href="#sakura" class="sakura-13" />
      <use href="#sakura" class="sakura-14" />
      <use href="#sakura" class="sakura-15" />
      <use href="#sakura" class="sakura-16" />
      <use href="#sakura" class="sakura-17" />
      <use href="#sakura" class="sakura-18" />
      <use href="#sakura" class="sakura-19" />
      <use href="#sakura" class="sakura-20" />
    </svg>
  </div>
  <Layout>
    <template #doc-before>
      <ClientOnly>
        <j-container v-if="!$frontmatter.page" gap="8px" style="margin: 12px 0 12px 0;">
          <j-tag round :bordered="false">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15" height="15" fill="currentColor">
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/>
              </svg>
            </template>
            {{ $frontmatter.date?.slice(0, 10) }}
          </j-tag>
          <a
            v-for="(item, index2) in $frontmatter.tags" :key="index2"
            :href="withBase(`/pages/tags.html?tag=${item}`)"
          >
            <j-tag round :bordered="false" strong class="hover-pointer" type="info">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15" height="15" fill="currentColor">
                  <path d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"/>
                </svg>
              </template>
              <span>{{ item }}</span>
            </j-tag>
          </a>
        </j-container>
      </ClientOnly>
    </template>
    <template #doc-after>
      <ClientOnly>
        <div :key="giscusKey">
          <Giscus
            id="comments" repo="dreamhunter2333/dreamhunter-blog"
            repo-id="MDEwOlJlcG9zaXRvcnkzMzIyNTA3MTc=" category="General" category-id="DIC_kwDOE82-Xc4CgbBf"
            mapping="pathname" reactions-enabled="1" emit-metadata="0" input-position="top"
            :theme="isDark ? 'dark' : 'light'" lang="zh-CN" loading="lazy"
          />
        </div>
      </ClientOnly>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from "vitepress"
import Giscus from '@giscus/vue'
import { computed } from 'vue'
import JTag from './base/JTag.vue'
import JContainer from './base/JContainer.vue'

const { isDark, frontmatter } = useData()
const { Layout } = DefaultTheme

const giscusKey = computed(() => {
    return `${frontmatter.value.title}-${frontmatter.value.date}-${frontmatter.value?.tags?.join('')}`
})
</script>

<style scoped>
/* 🌸 二次元真实樱花飘落效果 */
.sakura-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.sakura-svg {
  width: 100%;
  height: 100%;
}

/* 20朵樱花，不同位置、速度、大小 - 更舒缓的飘落速度 */
.sakura-1 { animation: fall-swing-1 30s linear infinite; }
.sakura-2 { animation: fall-swing-2 35s linear infinite 1s; }
.sakura-3 { animation: fall-swing-3 32s linear infinite 2s; }
.sakura-4 { animation: fall-swing-4 38s linear infinite 0.5s; }
.sakura-5 { animation: fall-swing-5 28s linear infinite 3s; }
.sakura-6 { animation: fall-swing-6 40s linear infinite 1.5s; }
.sakura-7 { animation: fall-swing-7 33s linear infinite 2.5s; }
.sakura-8 { animation: fall-swing-8 36s linear infinite 0.8s; }
.sakura-9 { animation: fall-swing-9 31s linear infinite 3.5s; }
.sakura-10 { animation: fall-swing-10 39s linear infinite 2.2s; }
.sakura-11 { animation: fall-swing-11 32s linear infinite 4s; }
.sakura-12 { animation: fall-swing-12 35s linear infinite 0.3s; }
.sakura-13 { animation: fall-swing-13 30s linear infinite 1.8s; }
.sakura-14 { animation: fall-swing-14 40s linear infinite 3.2s; }
.sakura-15 { animation: fall-swing-15 28s linear infinite 0.7s; }
.sakura-16 { animation: fall-swing-16 37s linear infinite 2.8s; }
.sakura-17 { animation: fall-swing-17 33s linear infinite 4.2s; }
.sakura-18 { animation: fall-swing-18 36s linear infinite 1.3s; }
.sakura-19 { animation: fall-swing-19 31s linear infinite 3.8s; }
.sakura-20 { animation: fall-swing-20 39s linear infinite 2.5s; }

/* 暗色模式 - 更亮更清晰的樱花 */
:root.dark .sakura-svg #petal {
  fill: rgba(251, 114, 153, 0.6);
  stroke: rgba(251, 114, 153, 0.8);
}

/* 左右摇摆 + 旋转飘落动画 - 真实物理效果 */
@keyframes fall-swing-1 {
  0% { transform: translate(5%, -10%) rotate(0deg) scale(0.8); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(8%, 20%) rotate(90deg) scale(0.8); }
  50% { transform: translate(3%, 50%) rotate(180deg) scale(0.9); }
  75% { transform: translate(7%, 80%) rotate(270deg) scale(0.8); }
  95% { opacity: 1; }
  100% { transform: translate(4%, 110%) rotate(360deg) scale(0.7); opacity: 0; }
}

@keyframes fall-swing-2 {
  0% { transform: translate(15%, -10%) rotate(0deg) scale(1.1); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(12%, 20%) rotate(-90deg) scale(1.1); }
  50% { transform: translate(17%, 50%) rotate(-180deg) scale(1); }
  75% { transform: translate(13%, 80%) rotate(-270deg) scale(1.1); }
  95% { opacity: 1; }
  100% { transform: translate(16%, 110%) rotate(-360deg) scale(1.2); opacity: 0; }
}

@keyframes fall-swing-3 {
  0% { transform: translate(28%, -10%) rotate(0deg) scale(0.9); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(32%, 20%) rotate(120deg) scale(0.9); }
  50% { transform: translate(26%, 50%) rotate(240deg) scale(1); }
  75% { transform: translate(30%, 80%) rotate(360deg) scale(0.9); }
  95% { opacity: 1; }
  100% { transform: translate(27%, 110%) rotate(480deg) scale(0.8); opacity: 0; }
}

@keyframes fall-swing-4 {
  0% { transform: translate(42%, -10%) rotate(0deg) scale(1.2); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(38%, 20%) rotate(-100deg) scale(1.2); }
  50% { transform: translate(44%, 50%) rotate(-200deg) scale(1.1); }
  75% { transform: translate(40%, 80%) rotate(-300deg) scale(1.2); }
  95% { opacity: 1; }
  100% { transform: translate(43%, 110%) rotate(-400deg) scale(1.3); opacity: 0; }
}

@keyframes fall-swing-5 {
  0% { transform: translate(55%, -10%) rotate(0deg) scale(0.85); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(58%, 20%) rotate(80deg) scale(0.85); }
  50% { transform: translate(53%, 50%) rotate(160deg) scale(0.9); }
  75% { transform: translate(57%, 80%) rotate(240deg) scale(0.85); }
  95% { opacity: 1; }
  100% { transform: translate(54%, 110%) rotate(320deg) scale(0.8); opacity: 0; }
}

@keyframes fall-swing-6 {
  0% { transform: translate(68%, -10%) rotate(0deg) scale(1); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(65%, 20%) rotate(-110deg) scale(1); }
  50% { transform: translate(70%, 50%) rotate(-220deg) scale(1.05); }
  75% { transform: translate(66%, 80%) rotate(-330deg) scale(1); }
  95% { opacity: 1; }
  100% { transform: translate(69%, 110%) rotate(-440deg) scale(0.95); opacity: 0; }
}

@keyframes fall-swing-7 {
  0% { transform: translate(78%, -10%) rotate(0deg) scale(1.15); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(82%, 20%) rotate(95deg) scale(1.15); }
  50% { transform: translate(76%, 50%) rotate(190deg) scale(1.1); }
  75% { transform: translate(80%, 80%) rotate(285deg) scale(1.15); }
  95% { opacity: 1; }
  100% { transform: translate(77%, 110%) rotate(380deg) scale(1.2); opacity: 0; }
}

@keyframes fall-swing-8 {
  0% { transform: translate(88%, -10%) rotate(0deg) scale(0.95); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(85%, 20%) rotate(-85deg) scale(0.95); }
  50% { transform: translate(90%, 50%) rotate(-170deg) scale(1); }
  75% { transform: translate(87%, 80%) rotate(-255deg) scale(0.95); }
  95% { opacity: 1; }
  100% { transform: translate(89%, 110%) rotate(-340deg) scale(0.9); opacity: 0; }
}

@keyframes fall-swing-9 {
  0% { transform: translate(22%, -10%) rotate(0deg) scale(1.05); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(25%, 20%) rotate(105deg) scale(1.05); }
  50% { transform: translate(20%, 50%) rotate(210deg) scale(1.1); }
  75% { transform: translate(24%, 80%) rotate(315deg) scale(1.05); }
  95% { opacity: 1; }
  100% { transform: translate(21%, 110%) rotate(420deg) scale(1); opacity: 0; }
}

@keyframes fall-swing-10 {
  0% { transform: translate(35%, -10%) rotate(0deg) scale(0.88); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(38%, 20%) rotate(-95deg) scale(0.88); }
  50% { transform: translate(33%, 50%) rotate(-190deg) scale(0.9); }
  75% { transform: translate(37%, 80%) rotate(-285deg) scale(0.88); }
  95% { opacity: 1; }
  100% { transform: translate(34%, 110%) rotate(-380deg) scale(0.85); opacity: 0; }
}

@keyframes fall-swing-11 {
  0% { transform: translate(48%, -10%) rotate(0deg) scale(1.08); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(52%, 20%) rotate(88deg) scale(1.08); }
  50% { transform: translate(46%, 50%) rotate(176deg) scale(1.05); }
  75% { transform: translate(50%, 80%) rotate(264deg) scale(1.08); }
  95% { opacity: 1; }
  100% { transform: translate(47%, 110%) rotate(352deg) scale(1.1); opacity: 0; }
}

@keyframes fall-swing-12 {
  0% { transform: translate(62%, -10%) rotate(0deg) scale(0.92); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(58%, 20%) rotate(-102deg) scale(0.92); }
  50% { transform: translate(64%, 50%) rotate(-204deg) scale(0.95); }
  75% { transform: translate(60%, 80%) rotate(-306deg) scale(0.92); }
  95% { opacity: 1; }
  100% { transform: translate(63%, 110%) rotate(-408deg) scale(0.9); opacity: 0; }
}

@keyframes fall-swing-13 {
  0% { transform: translate(72%, -10%) rotate(0deg) scale(1.18); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(75%, 20%) rotate(92deg) scale(1.18); }
  50% { transform: translate(70%, 50%) rotate(184deg) scale(1.15); }
  75% { transform: translate(74%, 80%) rotate(276deg) scale(1.18); }
  95% { opacity: 1; }
  100% { transform: translate(71%, 110%) rotate(368deg) scale(1.2); opacity: 0; }
}

@keyframes fall-swing-14 {
  0% { transform: translate(82%, -10%) rotate(0deg) scale(0.82); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(85%, 20%) rotate(-88deg) scale(0.82); }
  50% { transform: translate(80%, 50%) rotate(-176deg) scale(0.85); }
  75% { transform: translate(84%, 80%) rotate(-264deg) scale(0.82); }
  95% { opacity: 1; }
  100% { transform: translate(81%, 110%) rotate(-352deg) scale(0.8); opacity: 0; }
}

@keyframes fall-swing-15 {
  0% { transform: translate(92%, -10%) rotate(0deg) scale(1.12); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(95%, 20%) rotate(98deg) scale(1.12); }
  50% { transform: translate(90%, 50%) rotate(196deg) scale(1.1); }
  75% { transform: translate(94%, 80%) rotate(294deg) scale(1.12); }
  95% { opacity: 1; }
  100% { transform: translate(91%, 110%) rotate(392deg) scale(1.15); opacity: 0; }
}

@keyframes fall-swing-16 {
  0% { transform: translate(12%, -10%) rotate(0deg) scale(0.98); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(9%, 20%) rotate(-92deg) scale(0.98); }
  50% { transform: translate(14%, 50%) rotate(-184deg) scale(1); }
  75% { transform: translate(10%, 80%) rotate(-276deg) scale(0.98); }
  95% { opacity: 1; }
  100% { transform: translate(13%, 110%) rotate(-368deg) scale(0.95); opacity: 0; }
}

@keyframes fall-swing-17 {
  0% { transform: translate(38%, -10%) rotate(0deg) scale(1.22); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(42%, 20%) rotate(108deg) scale(1.22); }
  50% { transform: translate(36%, 50%) rotate(216deg) scale(1.2); }
  75% { transform: translate(40%, 80%) rotate(324deg) scale(1.22); }
  95% { opacity: 1; }
  100% { transform: translate(37%, 110%) rotate(432deg) scale(1.25); opacity: 0; }
}

@keyframes fall-swing-18 {
  0% { transform: translate(52%, -10%) rotate(0deg) scale(0.78); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(55%, 20%) rotate(-78deg) scale(0.78); }
  50% { transform: translate(50%, 50%) rotate(-156deg) scale(0.8); }
  75% { transform: translate(54%, 80%) rotate(-234deg) scale(0.78); }
  95% { opacity: 1; }
  100% { transform: translate(51%, 110%) rotate(-312deg) scale(0.75); opacity: 0; }
}

@keyframes fall-swing-19 {
  0% { transform: translate(65%, -10%) rotate(0deg) scale(1.03); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(68%, 20%) rotate(112deg) scale(1.03); }
  50% { transform: translate(63%, 50%) rotate(224deg) scale(1.05); }
  75% { transform: translate(67%, 80%) rotate(336deg) scale(1.03); }
  95% { opacity: 1; }
  100% { transform: translate(64%, 110%) rotate(448deg) scale(1); opacity: 0; }
}

@keyframes fall-swing-20 {
  0% { transform: translate(98%, -10%) rotate(0deg) scale(0.87); opacity: 0; }
  5% { opacity: 1; }
  25% { transform: translate(95%, 20%) rotate(-107deg) scale(0.87); }
  50% { transform: translate(100%, 50%) rotate(-214deg) scale(0.9); }
  75% { transform: translate(96%, 80%) rotate(-321deg) scale(0.87); }
  95% { opacity: 1; }
  100% { transform: translate(99%, 110%) rotate(-428deg) scale(0.85); opacity: 0; }
}
</style>
