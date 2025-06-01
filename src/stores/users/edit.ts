import { ref } from 'vue'
import { defineStore } from 'pinia'
import userApi from '@/api/requests/api.user'
import type { UserEdit } from '@/types/user';
import { useRoleStore } from './roles';
import { useUserStore } from '@/stores/users/user';

export const useEditUserStore = defineStore('userCreate', () => {
  const user = ref<UserEdit>({
    username: "",
    name: "",
    surname: "",
    patronymic: "",
    id_role: undefined,
    address: undefined,
    email: undefined,
    password: "",
    photo: undefined,
  });
  const isLoading = ref(false);
  const roleStore = useRoleStore()
  const userStore = useUserStore()


  const createUser = async () => {
    isLoading.value = true;
    try {
      const response = await userApi.editUser(user.value)
      console.log(response)
      // user.value = response
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  const createOrganization = async () => {
    isLoading.value = true;
    try {
      // if (roleStorage) {
        user.value.id_role = roleStore.roles[1].id
      // }
      console.log()
      const response = await userApi.createUser(user.value)
      console.log(response)
      // user.value = response
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }


  const editPhoto = async (file: FormData) => {
      isLoading.value = true;
      try {
        const response = await userApi.upload(file)
        user.value = {
          ...response,
          password: "",
        }

      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    }

  const setUser = () => {
    if (userStore.user)
    user.value = {
      ...userStore.user,
      password: "",
    }
  }

  return {
    user,
    isLoading,
    createUser,
    createOrganization,
    editPhoto,
    setUser
  }
})
