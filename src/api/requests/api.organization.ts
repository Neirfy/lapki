import { axiosInstance } from "../axios.instance.ts";
import type { OrganizationInfo } from "@/types/organization.ts";


export default {
  getOrganizations(): Promise<OrganizationInfo[]> {
    return axiosInstance.get<OrganizationInfo[]>(`/organization/all`);
  },
};
