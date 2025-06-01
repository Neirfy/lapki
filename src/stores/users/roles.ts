import { ref } from 'vue'
import { defineStore } from 'pinia'
import roleApi from '@/api/requests/api.role'
import type { RoleInfo } from '@/types/roles';

export const useRoleStore = defineStore('role', () => {
  const roles = ref<RoleInfo[]>([]);
  const selected = ref<RoleInfo | null>(null)
  const isLoading = ref(false);

  const getRoles = async () => {
    isLoading.value = true;
    try {
      const response = await roleApi.getRoles()
      roles.value = response
      selected.value = response[1]
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    roles,
    selected,
    isLoading,
    getRoles,
  }
})
