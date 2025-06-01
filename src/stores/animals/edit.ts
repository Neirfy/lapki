
import { ref } from 'vue';
import { defineStore } from 'pinia';
import animalsApi from '@/api/requests/api.animals';
import fileApi from '@/api/requests/api.file'

import { useUserStore } from '@/stores/users/user';
import { useBreedStore } from '@/stores/animals/breeds';
import { useStatusStore } from '@/stores/animals/statuses';
import type { AnimalRequest} from '@/types/animals';


export const useAnimalEditStore = defineStore('animalEdit', () => {
  const animalEdit = ref<AnimalRequest>({
    photo: "",
    name: "",
    age: 0,
    description: undefined,
    id_status: "",
    id_breed: "",
    id_user: "",
  });
  const isLoading = ref(false);
  const userStore = useUserStore();
  const breedStore = useBreedStore();
  const statusStore = useStatusStore();

  const getAnimal = async (uuid: string) => {
    const response = await animalsApi.getAnimal(uuid)
    if (response) (
      animalEdit.value = {
        photo: response.photo ?? "",
        name: response.name,
        age: response.age,
        description: response.description ?? "",
        id_status: response.status.id,
        id_breed: response.breed.id ?? "",
        id_user: "",
      }
    )
  }

  const editAnimal = async () => {
    isLoading.value = true;
    try {
      if (userStore.user){
        animalEdit.value.id_user = userStore.user.id
        if (breedStore.selected?.id && statusStore.selected?.id ) {
          animalEdit.value.id_breed = breedStore.selected.id
          await animalsApi.createAnimal(animalEdit.value)
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  const changePhoto = async (file: FormData) => {
    isLoading.value = true;
    try {
      const response = await fileApi.upload(file)
      if (response) {
        animalEdit.value.photo = response.filePath;
      }

    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }
  

  return {
    animalEdit,
    isLoading,
    getAnimal,
    editAnimal,
    changePhoto,
  }
})
