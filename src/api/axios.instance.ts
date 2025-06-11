import axios from "axios";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.request.use((config) => {
  // const userStore = useUserStore()

  const token = localStorage.getItem("token");
  if (
    config.url
    &&
    (!config.url.includes("/login") || !config.url.includes("/register") || !config.url.includes("/roles"))
  ) {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      if (config.url?.includes('/files/upload') || config.url?.includes('/users/photo/update')) {
        const formData = new FormData();
        formData.append('file', config.data);
        config.data = formData;
      }
    } else {
      localStorage.removeItem("token");
    }
  }

  return config;
});



export const axiosInstance = {
  async get<T>(url: string, params?: object): Promise<T> {
    try {
      const response = await axiosApi.get(url, params);
      return response.data;
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
  },
  async post<T>(url: string, params?: object): Promise<T> {
    try {
      const response = await axiosApi.post(url, params);
      return response.data;
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
  },
  async put<T>(url: string, params?: object): Promise<T> {
    try {
      const response = await axiosApi.put(url, params);
      return response.data;
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
  },
  async patch<T>(url: string, params?: object): Promise<T> {
    try {
      const response = await axiosApi.patch(url, params);
      return response.data;
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
  },
  async delete<T>(url: string, params?: object): Promise<T> {
    try {
      const response = await axiosApi.delete(url, params);
      return response.data;
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
  },
};
