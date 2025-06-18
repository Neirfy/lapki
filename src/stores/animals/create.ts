import { ref } from 'vue';
import { defineStore } from 'pinia';
import animalsApi from '@/api/requests/api.animals';
import fileApi from '@/api/requests/api.file';

import { useUserStore } from '@/stores/users/user';
import { useBreedStore } from '@/stores/animals/breeds';
import { useStatusStore } from '@/stores/animals/statuses';
import type { AnimalRequest} from '@/types/animals';
import { useTypeStore } from './animal.types';


export const useAnimalCreateStore = defineStore('animalCreate', () => {
  const animalCreate = ref<AnimalRequest>({
    photo: "",
    name: "",
    age: 0,
    description: undefined,
    id_status: "",
    id_breed: "",
    id_user: "",
    id_type: "",
  });
  const isLoading = ref(false);
  const userStore = useUserStore();
  const breedStore = useBreedStore();
  const statusStore = useStatusStore();
  const typeStore = useTypeStore()


  const createAnimal = async () => {
      isLoading.value = true;
      try {
        if (userStore.user){
          animalCreate.value.id_user = userStore.user.id
          if (breedStore.selected && statusStore.selected) {
            animalCreate.value.id_breed = breedStore.selected.id ?? ""
            animalCreate.value.id_status = statusStore.selected?.id ?? ""
            animalCreate.value.id_type = typeStore.selected?.id ?? ""
          }
          await animalsApi.createAnimal(animalCreate.value)
        }
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    }

   const addPhoto = async (file: FormData) => {
      isLoading.value = true;
      try {
        const response = await fileApi.upload(file)
        if (response) {
          animalCreate.value.photo = response.filePath;
        }

      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    }

  return {
    animalCreate,
    isLoading,
    createAnimal,
    addPhoto,
  }
})
