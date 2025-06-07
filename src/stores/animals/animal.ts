
import { ref } from 'vue';
import { defineStore } from 'pinia';
import animalsApi from '@/api/requests/api.animals';
import requestApi from '@/api/requests/api.requests'

import { useUserStore } from '@/stores/users/user';

import type { AnimalItemInfo} from '@/types/animals';


export const useAnimalStore = defineStore('animal', () => {
  const animal = ref<AnimalItemInfo | null >(null);
  const isLoading = ref(false);
  const userStore = useUserStore();

  const getAnimal = async (uuid: string) => {
    isLoading.value = true;

    try {
      const response = await animalsApi.getAnimal(uuid)
      if (response) (
        animal.value = response
      )
    }
    catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  const createRequest = async () => {
    isLoading.value = true;
    try {
      if (userStore.user && animal.value) {
        const respone = await requestApi.createRequest(animal.value?.id)
        // animalEdit.value.id_user = userStore.user.id
        // if (breedStore.selected?.id && statusStore.selected?.id ) {
        //   animalEdit.value.id_breed = breedStore.selected.id
        //   await animalsApi.createAnimal(animalEdit.value)
        // }
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  const clean = () => {
    animal.value =null
  }

  return {
    animal,
    isLoading,
    getAnimal,
    createRequest,
    clean,
  }
})
