import { http } from "@/utils/http";
import type { CreateGuestOrderResponse } from "@/types/response/order.response";

export const paymentService = {
  getPaymentQrByToken: (tokenUrl: string) =>
    http.get<CreateGuestOrderResponse>(`payments/${tokenUrl}/qr`),
};
