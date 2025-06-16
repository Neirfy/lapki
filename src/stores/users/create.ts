import { ref } from 'vue'
import { defineStore } from 'pinia'
import userApi from '@/api/requests/api.user'
import type { UserRegister } from '@/types/user';
import { useRoleStore } from './roles';

export const useCreateUserStore = defineStore('userCreate', () => {
  const user = ref<UserRegister>({
    username: "",
    name: "",
    surname: "",
    patronymic: "",
    id_role: "",
    address: "",
    email: "",
    password: "",
  });
  const isLoading = ref(false);
  const roleStore = useRoleStore()

  const createUser = async () => {
    isLoading.value = true;
    try {
      const response = await userApi.createUser(user.value)
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

  return {
    user,
    isLoading,
    createUser,
    createOrganization
  }
})
