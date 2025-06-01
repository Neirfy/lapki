import { axiosInstance } from "../axios.instance.ts";
import type { StatusInfo } from "@/types/statuses.ts";


export default {
  getStatuses(): Promise<StatusInfo[]> {
    return axiosInstance.get<StatusInfo[]>(`/status/all`);
  },
};
