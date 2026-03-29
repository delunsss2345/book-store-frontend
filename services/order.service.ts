import type { AxiosRequestConfig } from "axios";
import type {
  CreateGuestOrdersAndPaymentDTO,
  CreateUserOrdersAndPaymentDTO,
} from "@/types/request/order.request";
import type { GetOrderItemsResponse } from "@/types/response/order.response";
import { http } from "@/utils/http";

export const orderService = {
  createOrderGuest: (payload: CreateGuestOrdersAndPaymentDTO) =>
    http.post("orders/guest/checkout", payload),

  createOrderUser: (payload: CreateUserOrdersAndPaymentDTO) =>
    http.post("orders/user/checkout", payload),

  getOrders: <T = unknown>(config?: AxiosRequestConfig) =>
    http.get<T>("orders", config),

  getOrderItems: (orderId: string) => {
    return http.get<GetOrderItemsResponse>(`orders/${orderId}`);
  },
};
