import type { UserLogin, UserToken } from "@/types/user.ts";

import { axiosInstance } from "../axios.instance.ts";

export default {
  loginUser(data: UserLogin): Promise<UserToken> {
    // const data = {
    //   contextKey: contextKey
    // }
    const body = new URLSearchParams();
    body.append('username', data.username);
    body.append('password', data.password);
    return axiosInstance.post<UserToken>(`/auth/login`, body);
  },
  registerUser(contextKey: string): Promise<UserToken> {
    const data = {
      contextKey: contextKey
    }
    return axiosInstance.post<UserToken>(`/auth/login`, data);
  },

};
