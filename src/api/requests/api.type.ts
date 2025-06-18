import { axiosInstance } from "../axios.instance.ts";
import type { AnimalTypeInfo } from "@/types/types.ts";


export default {
  getTypes(): Promise<AnimalTypeInfo[]> {
    return axiosInstance.get<AnimalTypeInfo[]>(`/animal_types/all`);
  },
};
