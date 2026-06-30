import type { SePayHooksDTO } from "@/types/request/hooks.request";
import { OrderStatusResponse, PaymentHistoryResponseDto } from "@/types/response/order.response";
import { ProxyResponse } from "@/types/response/base.response";
import { http } from "@/utils/http";

export const hooksApi = {
  sePayPayment: (payload: SePayHooksDTO) =>
    http.post("/hooks/sepay-payment", payload),

  getOrderStatus: (orderId: string): Promise<OrderStatusResponse> =>
    http.get(`/hooks/${orderId}/status`),

  getPaymentByToken: (token: string): Promise<OrderStatusResponse> =>
    http.get(`/payments/${token}/qr`),

  getPaymentHistory: (orderId: number): Promise<ProxyResponse<PaymentHistoryResponseDto[]>> =>
    http.get(`/hooks/${orderId}/payment-history`),
};
