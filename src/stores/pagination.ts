import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PaginationInfo } from '@/types/pagination';

export const usePaginationStore = defineStore('pagination', () => {
  const pagination = ref<PaginationInfo>({
    total: 0,
    previos: 0,
    next: 0,
    page: 1,
    per_page: 8,
    total_pages: 0,
  });

  const nextPage = () => {
  console.log(pagination.value.page)
  if (pagination.value.page < pagination.value.total_pages) {
    pagination.value.page += 1
  }
}

const previosPage = () => {
  console.log(pagination.value.page)
  if (pagination.value.page > 1) {
    pagination.value.page -= 1
  }
}

  return {
    pagination,
    nextPage,
    previosPage,
  }
})
