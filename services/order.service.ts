import type { CreateGuestOrdersAndPaymentDTO } from "@/types/request/order.request";
import { http } from "@/utils/http";

export const orderService = {
  createOrderGuest: (payload: CreateGuestOrdersAndPaymentDTO) =>
    http.post("orders/guest/checkout", payload),
};
