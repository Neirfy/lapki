import type { UserEdit, UserInfo, UserRegister } from "@/types/user.ts";

import { axiosInstance } from "../axios.instance.ts";
import type { FileInfo } from "@/types/file.ts";

export default {
  getUser(): Promise<UserInfo> {
    return axiosInstance.get<UserInfo>(`/auth/users/me`);
  },
  createUser(data: UserRegister): Promise<UserInfo> {
    return axiosInstance.post<UserInfo>(`/auth/register`, data);
  },
  editUser(data: UserEdit): Promise<UserInfo> {
    return axiosInstance.post<UserInfo>(`/auth/edit`, data);
  },
  upload(file: FormData): Promise<UserInfo> {
      return axiosInstance.post<UserInfo>("users/photo/update", file);
    }
};
