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
  border: none;
  border-radius: 10px;
  background: var(--jp-gradient-button);
  color: white;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: var(--jp-shadow-sm);
}

.j-pagination__button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--jp-shadow-md);
}

.j-pagination__button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: var(--vp-c-bg-soft);
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
