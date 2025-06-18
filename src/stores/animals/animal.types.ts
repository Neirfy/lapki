import { ref } from 'vue'
import { defineStore } from 'pinia'
import typeApi from '@/api/requests/api.type'
import type { AnimalTypeInfo } from '@/types/types';

export const useTypeStore = defineStore('type', () => {
  const types = ref<AnimalTypeInfo[]>([]);
  const selected = ref<AnimalTypeInfo | null>(null)
  const isLoading = ref(false);

  const getTypes = async () => {
    isLoading.value = true;
    try {
      const response = await typeApi.getTypes()
      types.value = response
      selected.value = response[0]
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    types,
    selected,
    isLoading,
    getTypes,
  }
})
