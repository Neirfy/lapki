import { ref } from 'vue'
import { defineStore } from 'pinia'
import statusApi from '@/api/requests/api.status'
import type { StatusInfo } from '@/types/statuses';

export const useStatusStore = defineStore('status', () => {
  const statuses = ref<StatusInfo[]>([]);
  const selected = ref<StatusInfo | null>(null)

  const isLoading = ref(false);

  const getStatuses = async () => {
    isLoading.value = true;
    try {
      const response = await statusApi.getStatuses()
      statuses.value = response
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    statuses,
    selected,
    isLoading,
    getStatuses,
  }
})
