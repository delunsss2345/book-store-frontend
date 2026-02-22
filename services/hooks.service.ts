import type { SePayHooksDTO } from "@/types/request/hooks.request";
import { http } from "@/utils/http";

export const hooksApi = {
  sePayPayment: (payload: SePayHooksDTO) =>
    http.post("/hooks/sepay-payment", payload),

  getOrderStatus: (orderId: string) =>
    http.get(`/hooks/${orderId}/status`),
};
