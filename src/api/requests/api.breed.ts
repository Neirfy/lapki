import { axiosInstance } from "../axios.instance.ts";
import type { BreedInfo } from "@/types/breeds.ts";


export default {
  getBreeds(): Promise<BreedInfo[]> {
    return axiosInstance.get<BreedInfo[]>(`/breeds/all`);
  },
};
