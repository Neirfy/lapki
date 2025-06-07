import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PaginationFilter } from '@/types/pagination';

export const usePaginationStore = defineStore('pagination', () => {
  const pagination = ref<PaginationFilter>({
    page: 1,
    per_page: 10
  });

  return {
    pagination,
  }
})
