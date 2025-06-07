import { ref } from 'vue'
import { defineStore } from 'pinia'
import requestApi from '@/api/requests/api.requests'
import type { RequestInfo } from '@/types/requests';

export const useOrderStore = defineStore('order', () => {
  const orders = ref<RequestInfo[]>([]);
  const selected = ref<RequestInfo | null>(null)
  const isLoading = ref(false);

  const getOrders = async () => {
    isLoading.value = true;
    try {
      const response = await requestApi.getReusests()
      orders.value = response
      selected.value = response[0]
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    orders,
    selected,
    isLoading,
    getOrders,
  }
})
