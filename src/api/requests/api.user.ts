import type { UserInfo, UserRegister, UserRequest } from "@/types/user.ts";

import { axiosInstance } from "../axios.instance.ts";
// import type { FileInfo } from "@/types/file.ts";

export default {
  getUser(): Promise<UserInfo> {
    return axiosInstance.get<UserInfo>(`/auth/users/me`);
  },
  createUser(data: UserRegister): Promise<UserInfo> {
    return axiosInstance.post<UserInfo>(`/auth/register`, data);
  },
  editUser(user_id: string, data: UserRequest): Promise<UserInfo> {
    return axiosInstance.put<UserInfo>(`/users/${user_id}`, data);
  },
  uploadPhoto(file: FormData): Promise<UserInfo> {
    return axiosInstance.post<UserInfo>("users/photo/update", file);
  }
};
