import { axiosInstance } from "../axios.instance.ts";
import type { AnimalsInfo, AnimalItemInfo, AnimalFilter, OrderBy, AnimalRequest, AnimalUserItemInfo } from "@/types/animals.ts";
import type { PaginationFilter } from "@/types/pagination.ts";

export default {
  getAnimals(
    pag: PaginationFilter,
    filter: AnimalFilter,
    order?: OrderBy
  ): Promise<AnimalsInfo> {
    const params = new URLSearchParams();

    // Пагинация
    if (pag.page != null) params.append("page", pag.page.toString());
    if (pag.per_page != null) params.append("per_page", pag.per_page.toString());

    // Фильтры
    if (filter.status) params.append("status", filter.status);
    if (filter.type) params.append("type", filter.type);
    if (filter.breed) params.append("breed", filter.breed);
    if (filter.organization) params.append("organization", filter.organization);
    if (filter.age != null) params.append("age", filter.age.toString());

    // Сортировка
    if (order) params.append("order", order);

    return axiosInstance.get<AnimalsInfo>(`animals/all?${params.toString()}`);
  },
  getAnimalsOrganization(
    org_id: string,
    pag: PaginationFilter,
    filter: AnimalFilter,
    order?: OrderBy
  ): Promise<AnimalsInfo> {
    const params = new URLSearchParams();

    // Пагинация
    if (pag.page != null) params.append("page", pag.page.toString());
    if (pag.per_page != null) params.append("per_page", pag.per_page.toString());

    // Фильтры
    if (filter.status) params.append("status", filter.status);
    if (filter.type) params.append("type", filter.type);
    if (filter.breed) params.append("breed", filter.breed);
    if (filter.organization) params.append("organization", filter.organization);
    if (filter.age != null) params.append("age", filter.age.toString());

    // Сортировка
    if (order) params.append("order", order);

    return axiosInstance.get<AnimalsInfo>(`animals/${org_id}/all?${params.toString()}`);
  },


  getAnimal(uuid: string): Promise<AnimalItemInfo> {
    return axiosInstance.get<AnimalItemInfo>(`/animals/${uuid}`);
  },
  createAnimal(data: AnimalRequest): Promise<AnimalItemInfo> {
    return axiosInstance.post<AnimalItemInfo>(`/animals/create`, data);
  },
  editAnimal(animal_id: string, data: AnimalRequest): Promise<AnimalItemInfo> {
    return axiosInstance.put<AnimalItemInfo>(`/animals/${animal_id}`, data);
  },
  getAnimalUser(uuid: string): Promise<AnimalUserItemInfo> {
    return axiosInstance.get<AnimalUserItemInfo>(`/animals/${uuid}/user`);
  },

};
