import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import animalApi from '@/api/requests/api.animals'
import type { AnimalItemInfo } from '@/types/animals';
import { usePaginationStore } from '../pagination';
import { useAnimalFiltersStore } from './filter';
import { useUserStore } from '../users/user';
import type { PaginationFilter } from '@/types/pagination';

export const useAnimalsOrganizationStore = defineStore('animalsOrganization', () => {
  const animals = ref<AnimalItemInfo[]>([]);
  const isLoading = ref(false);

  const paginationStore = usePaginationStore();
  const filter = useAnimalFiltersStore();
  const userStore = useUserStore()

  const getAnimals = async () => {
    isLoading.value = true;
    try {
      animals.value.splice(0)
      const pagination: PaginationFilter = {
        page: paginationStore.pagination.page,
        per_page: paginationStore.pagination.per_page
      }
      if (userStore.user) {
        const response = await animalApi.getAnimalsOrganization(userStore.user?.id, pagination, filter.animalFilter, filter.order)
        animals.value = response.items
        paginationStore.pagination = response.pagination
      }
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

  watch(
  () => paginationStore.pagination.page,
  async () => {
    await getAnimals();
  }
);

  watch(() => filter.animalFilter, () => {
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
