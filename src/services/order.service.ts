import type {
  CreateGuestOrdersAndPaymentDTO,
  CreateUserOrdersAndPaymentDTO,
} from "@/types/request/order.request";
import type { CreateGuestOrderResponse, CreateUserOrderResponse, GetOrderItemsResponse, GetUserOrdersResponse } from "@/types/response/order.response";
import { http } from "@/utils/http";
import type { AxiosRequestConfig } from "axios";

export const orderService = {
  createOrderGuest: (payload: CreateGuestOrdersAndPaymentDTO) =>
    http.post<CreateGuestOrderResponse>("orders/guest/checkout", payload),

  createOrderUser: (payload: CreateUserOrdersAndPaymentDTO) =>
    http.post<CreateUserOrderResponse>("orders/user/checkout", payload),

  getOrders: (config?: AxiosRequestConfig) =>
    http.get<GetUserOrdersResponse>("orders", config),

  getOrderItems: (orderId: string) => {
    return http.get<GetOrderItemsResponse>(`orders/${orderId}`);
  },
};
