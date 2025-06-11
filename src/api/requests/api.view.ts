import { axiosInstance } from "../axios.instance.ts";
import type { ViewInfo } from '@/types/views';


export default {
  getViews(): Promise<ViewInfo[]> {
    return axiosInstance.get<ViewInfo[]>(`/views/my`);
  },
};
