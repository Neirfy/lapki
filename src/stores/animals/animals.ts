import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import animalApi from '@/api/requests/api.animals'
import type { AnimalItemInfo } from '@/types/animals';
import { usePaginationStore } from '../pagination';
import { useAnimalFiltersStore } from './filter';
import { useUserStore } from '../users/user';

export const useAnimalsStore = defineStore('animals', () => {
  const animals = ref<AnimalItemInfo[]>([]);
  const isLoading = ref(false);

  const pagination = usePaginationStore();
  const filter = useAnimalFiltersStore();
  const userStore = useUserStore()

  const getAnimals = async () => {
    isLoading.value = true;
    try {
      animals.value.splice(0)
      console.log(filter.animalFilter)
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

  watch(() => filter.animalFilter.breed, () => {
    if (userStore.user?.role === 'organization') {
      getAnimals();
    }
  }, { deep: true });

  return {
    animals,
    isLoading,
    getAnimals,
  }
})
