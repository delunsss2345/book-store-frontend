import type { AxiosRequestConfig } from "axios";
import type { CreateGuestOrdersAndPaymentDTO } from "@/types/request/order.request";
import { http } from "@/utils/http";

export const orderService = {
  createOrderGuest: (payload: CreateGuestOrdersAndPaymentDTO) =>
    http.post("orders/guest/checkout", payload),

  getOrders: <T = unknown>(config?: AxiosRequestConfig) =>
    http.get<T>("orders", config),
};
