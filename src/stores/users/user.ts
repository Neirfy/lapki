import { ref } from 'vue'
import { defineStore } from 'pinia'
import userApi from '@/api/requests/api.user'
import type { UserInfo } from '@/types/user';

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInfo | null>(null);
  const isLoading = ref(false);
  const isSidebarOpen = ref(true);

  const getUser = async () => {
    isLoading.value = true;
    try {
      const response = await userApi.getUser()
      user.value = response
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    user,
    isLoading,
    isSidebarOpen,
    getUser,
  }
})
