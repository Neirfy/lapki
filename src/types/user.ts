export type UserLogin = {
  username: string
  password: string
}

export type UserToken = {
  access_token: string
  token_type: string
}

export type UserRegister = {
  username: string
  password: string
  surname: string
  name: string
  id_role?: string | undefined
  address?: string | undefined
  email?: string | undefined
  patronymic?: string | undefined
  phone1?: string | undefined
  phone2?: string | undefined
  vk?: string | undefined
  tg?: string | undefined
  birthday?: string | undefined
}

// export type UserEdit = UserRegister & {
//   photo?: string | undefined
// }

export type UserInfo = {
  id: string
  username: string
  surname: string
  name: string
  patronymic?: string | undefined
  address?: string | undefined
  email?: string | undefined
  photo?: string | undefined
  phone1?: string | undefined
  phone2?: string | undefined
  vk?:string | undefined
  tg?:string | undefined
  role: string
  birthday?: string | undefined
  is_archived: boolean
}

export type UserRequest = {
  surname?: string | undefined
  name?: string | undefined
  patronymic?: string | undefined
  address?: string | undefined
  email?: string | undefined
  phone1?: string | undefined
  phone2?: string | undefined
  vk?: string | undefined
  tg?: string | undefined
  birthday?: string | undefined
}
