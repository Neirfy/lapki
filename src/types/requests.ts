export type RequestInfo = {
  id: string
  user: RequestUserInfo
  animal: RequestAnimalInfo
  created_at: string
}

export type RequestUserInfo = {
  id: string
  surname: string
  name: string
  patronymic: string
  photo: string
}

export type RequestAnimalInfo = {
  id: string
  name: string
  photo: string
}
