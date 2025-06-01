import { axiosInstance } from "../axios.instance.ts";
import type { RoleInfo } from "@/types/roles.ts";


export default {
  getRoles(): Promise<RoleInfo[]> {
    return axiosInstance.get<RoleInfo[]>(`/roles/all`);
  },
};
