import { axiosInstance } from "../axios.instance.ts";
import type { RequestInfo } from "@/types/requests.ts";

export default {
  getReusests(): Promise<RequestInfo[]> {
    return axiosInstance.get<RequestInfo[]>(`/requests/organization/all`);
  },
  createRequest(animal_id: string): Promise<string> {
    return axiosInstance.post<string>(`/requests/create/${animal_id}`);
  },
  acceptRequest(id_request: string): Promise<string> {
    return axiosInstance.post<string>(`/requests/${id_request}/accept`);
  },
  declineRequest(id_request: string): Promise<string> {
    return axiosInstance.delete<string>(`/requests/${id_request}/decline`);
  },


};
