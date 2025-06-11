import { ref } from 'vue'
import { defineStore } from 'pinia'
import organizationApi from '@/api/requests/api.organization'
import type { OrganizationInfo } from '@/types/organization';

export const useOrganizationStore = defineStore('organization', () => {
  const organizations = ref<OrganizationInfo[]>([]);
  const selected = ref<OrganizationInfo | null>(null)
  const isLoading = ref(false);

  const getOrganizations = async () => {
    isLoading.value = true;
    try {
      const response = await organizationApi.getOrganizations()
      organizations.value = response
      selected.value = response[0]
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    organizations,
    selected,
    isLoading,
    getOrganizations,
  }
})
