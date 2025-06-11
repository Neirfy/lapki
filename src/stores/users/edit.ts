import { ref } from 'vue'
import { defineStore } from 'pinia'
import userApi from '@/api/requests/api.user'
import type { UserRequest } from '@/types/user';
import { useUserStore } from '@/stores/users/user';

export const useEditUserStore = defineStore('userEdit', () => {
  const user = ref<UserRequest>({});
  const isLoading = ref(false);
  const userStore = useUserStore()
  const photo = ref({path: ""})


  const editUser = async () => {
    isLoading.value = true;
    try {
      if (userStore.user && user.value) {
        const response = await userApi.editUser(userStore.user.id, user.value)
        console.log(response)
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  const editPhoto = async (file: FormData) => {
      isLoading.value = true;
      console.log(file)
      try {
        const response = await userApi.uploadPhoto(file)
        if (response) {
          userStore.user = response
          photo.value.path = response.photo || ""
        }
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    }

  const setUser = () => {
    if (userStore.user) {
      user.value = userStore.user
      photo.value.path = userStore.user?.photo || ""
    }
  }

  return {
    user,
    photo,
    isLoading,
    editUser,
    editPhoto,
    setUser
  }
})
