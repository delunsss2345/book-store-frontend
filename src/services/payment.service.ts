import { http } from "@/utils/http";
import type { PaymentQrResponse } from "@/types/response/order.response";

export const paymentService = {
  getPaymentQrByToken: (tokenUrl: string) =>
    http.get<PaymentQrResponse>(`payments/${tokenUrl}/qr`),
};
