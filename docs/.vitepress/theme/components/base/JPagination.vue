<!-- 日系清新分页组件 - Japanese Fresh Pagination Component -->
<template>
  <div class="j-pagination">
    <button
      class="j-pagination__button"
      :disabled="page === 1"
      @click="handlePageChange(page - 1)"
    >
      ‹
    </button>

    <span class="j-pagination__info">
      {{ page }} / {{ pageCount }}
    </span>

    <button
      class="j-pagination__button"
      :disabled="page === pageCount"
      @click="handlePageChange(page + 1)"
    >
      ›
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  page: number
  pageCount: number
}>()

const emit = defineEmits<{
  'update:page': [value: number]
}>()

const handlePageChange = (newPage: number) => {
  if (newPage >= 1 && newPage <= props.pageCount) {
    emit('update:page', newPage)
  }
}
</script>

<style scoped>
.j-pagination {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
}

.j-pagination__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.j-pagination__button:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.j-pagination__button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-3);
}

.j-pagination__info {
  font-size: 15px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  min-width: 60px;
  text-align: center;
}
</style>
