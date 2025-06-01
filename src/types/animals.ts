import type { BreedInfo } from "./breeds"
import type { PaginationInfo } from "./pagination"
import type { StatusInfo } from "./statuses"

export type AnimalCreate = {
  photo: string
  name: string
  age: number
  description?: string
  id_status: string
  id_breed: string
  id_user: string
}

export type AnimalItemInfo = {
  id: string
  name: string
  age: number
  photo: string
  breed: BreedInfo
  description?: string
  status: StatusInfo
}

export type AnimalsInfo = {
  items: AnimalItemInfo[]
  pagination: PaginationInfo
}


export type OrderBy = "asc" | "desc" | undefined


export type AnimalFilter = {
  status: string
  breed: string
  organization: string
  age?: number | null
}

export type AnimalRequest ={
  photo?: string
  name: string
  age: number
  description?: string | undefined
  id_status: string
  id_breed: string
  id_user: string
}
