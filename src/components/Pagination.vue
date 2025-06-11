<script setup lang="ts">
import { usePaginationStore } from '@/stores/pagination';

const paginationStore = usePaginationStore()

</script>

<template>
  <div class="pagination">
    <button
      :disabled="paginationStore.pagination.page <= 1"
      @click="paginationStore.previosPage">
      Назад
    </button>
    <span class="page">Стр. {{ paginationStore.pagination.page }} из {{ paginationStore.pagination.total_pages }}</span>
    <button
      :disabled="paginationStore.pagination.page >= paginationStore.pagination.total_pages"
      @click="paginationStore.nextPage">
      Вперёд
    </button>
  </div>
</template>


