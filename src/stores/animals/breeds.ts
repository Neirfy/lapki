import { ref } from 'vue'
import { defineStore } from 'pinia'
import breedApi from '@/api/requests/api.breed'
import type { BreedInfo } from '@/types/breeds';

export const useBreedStore = defineStore('breed', () => {
  const breeds = ref<BreedInfo[]>([]);
  const selected = ref<BreedInfo | null>(null)
  const isLoading = ref(false);

  const getBreeds = async () => {
    isLoading.value = true;
    try {
      const response = await breedApi.getBreeds()
      breeds.value = response
      selected.value = response[0]
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    breeds,
    selected,
    isLoading,
    getBreeds,
  }
})
