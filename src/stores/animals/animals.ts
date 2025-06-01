import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import animalApi from '@/api/requests/api.animals'
import type { AnimalItemInfo } from '@/types/animals';
import { usePaginationStore } from '../pagination';
import { useAnimalFiltersStore } from './filter';

export const useAnimalsStore = defineStore('animals', () => {
  const animals = ref<AnimalItemInfo[]>([]);
  const isLoading = ref(false);

  const pagination = usePaginationStore();
    const filter = useAnimalFiltersStore();


  const getAnimals = async () => {
    isLoading.value = true;
    try {
      animals.value.splice(0)
      const response = await animalApi.getAnimals(pagination.pagination, filter.animalFilter, filter.order)
      animals.value = response.items
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  watch(() => filter.order,
    () => {
      getAnimals();
    },
  );

  return {
    animals,
    isLoading,
    getAnimals,
  }
})
