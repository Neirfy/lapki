import { ref } from 'vue'
import { defineStore } from 'pinia'
import requestApi from '@/api/requests/api.requests'
import type { RequestInfo } from '@/types/requests';
// import { useUserStore } from '../users/user';

export const useOrderStore = defineStore('order', () => {
  const orders = ref<RequestInfo[]>([]);
  const selected = ref<RequestInfo | null>(null)
  const isLoading = ref(false);

  // const userStore = useUserStore()

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

  const acceptOrder = async (order_id: string) => {
    isLoading.value = true;
    try {
        const response = await requestApi.acceptRequest(order_id)
        console.log(response)


    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  const declineOrder = async (order_id: string) => {
    isLoading.value = true;
    try {

        const response = await requestApi.declineRequest(order_id)
        console.log(response)

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
    acceptOrder,
    declineOrder,
  }
})
