import { envConfig } from "@/config/env.config";
import type { PromiseHandlers } from "@/types/lib/axios";
import type { RefreshTokenResponseData } from "@/types/response/auth.response";
import axios,
{
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const baseURL = envConfig.NEXT_PUBLIC_BASE_API ?? "";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

// != T mặc định là any
class AxiosHttp {
  private _send = async <T = unknown>(
    method: "get" | "post" | "put" | "delete" | "patch",
    path: string,
    data: object | undefined,
    config?: AxiosRequestConfig,
  ) => {
    try {
      const response = await axiosInstance.request<T>({
        method,
        url: path,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  get = <T = unknown>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return this._send<T>("get", path, undefined, config);
  };

  post = <T = unknown>(
    path: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return this._send<T>("post", path, data, config);
  };

  put = <T = unknown>(
    path: string,
    data: object,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return this._send<T>("put", path, data, config);
  };

  patch = <T = unknown>(
    path: string,
    data: object,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return this._send<T>("patch", path, data, config);
  };

  del = <T = unknown>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return this._send<T>("delete", path, undefined, config);
  };
}
export const http = new AxiosHttp();
