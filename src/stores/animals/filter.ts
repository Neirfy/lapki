import { reactive, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { AnimalFilter, OrderBy } from '@/types/animals';

export const useAnimalFiltersStore = defineStore('animalFilter', () => {
  const animalFilter = reactive<AnimalFilter>({
    status: "",
    breed: "",
    type: "",
    organization: "",
    age: null
  });
  const order = ref<OrderBy | undefined>(undefined)

  return {
    animalFilter,
    order,
  }
})
