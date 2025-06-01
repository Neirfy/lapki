import { ref } from 'vue'
import { defineStore } from 'pinia'
// import breedApi from '@/api/requests/api.breed'
import type { PaginationFilter } from '@/types/pagination';

export const usePaginationStore = defineStore('pagination', () => {
  const pagination = ref<PaginationFilter>({
    page: 1,
    per_page: 10
  });
  // const selected = ref<BreedInfo | null>(null)
  // const isLoading = ref(false);

  // const getBreeds = async () => {
  //   isLoading.value = true;
  //   try {
  //     const response = await breedApi.getBreeds()
  //     breeds.value = response
  //     selected.value = response[0]
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     isLoading.value = false;
  //   }
  // }

  return {
    pagination,
  }
})
