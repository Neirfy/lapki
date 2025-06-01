export type UserLogin = {
  username: string
  password: string
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
}

export type UserEdit = UserRegister & {
  photo?: string | undefined
}

export type UserToken = {
  access_token: string
  token_type: string
}

export type UserInfo = {
  id: string
  username: string
  surname: string
  name: string
  patronymic?: string | undefined
  address?: string | undefined
  email?: string | undefined
  photo?: string | undefined
  role: string
  is_archived: boolean
}
