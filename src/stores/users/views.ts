import { ref } from 'vue'
import { defineStore } from 'pinia'
import viewApi from '@/api/requests/api.view'
import type { ViewInfo } from '@/types/views';

export const useViewsStore = defineStore('view', () => {
  const views = ref<ViewInfo[]>([]);
  const isLoading = ref(false);
  const isSidebarOpen = ref(true);

  const getViews = async () => {
    isLoading.value = true;
    try {
      const response = await viewApi.getViews()
      views.value = response
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    views,
    isLoading,
    isSidebarOpen,
    getViews,
  }
})
