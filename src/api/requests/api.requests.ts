import { axiosInstance } from "../axios.instance.ts";
import type { RequestInfo } from "@/types/requests.ts";

export default {
  getReusests(): Promise<RequestInfo[]> {
    return axiosInstance.get<RequestInfo[]>(`/requests/organization/all`);
  },
  createRequest(animal_id: string): Promise<string> {
    return axiosInstance.post<string>(`/requests/create/${animal_id}`);
  },
};
