import { axiosInstance } from "../axios.instance.ts";
import type { FileInfo } from "@/types/file.ts";

export default {
  upload(file: FormData): Promise<FileInfo> {
    return axiosInstance.post<FileInfo>("files/upload", file);
  }
};
