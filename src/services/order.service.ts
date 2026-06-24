import type { CheckoutDTO } from "@/types/request/order.request";
import type {
  CheckoutResponse,
  GetOrderItemsResponse,
  GetUserOrdersResponse,
} from "@/types/response/order.response";
import { http } from "@/utils/http";
import type { AxiosRequestConfig } from "axios";

export const orderService = {
  /** Single unified checkout endpoint for both guests and logged-in users */
  checkout: (payload: CheckoutDTO) =>
    http.post<CheckoutResponse>("orders/checkout", payload),

  getOrders: (config?: AxiosRequestConfig) =>
    http.get<GetUserOrdersResponse>("orders", config),

  getOrderItems: (orderId: string) =>
    http.get<GetOrderItemsResponse>(`orders/${orderId}`),
};
