import { paymentService } from "@/services/payment.service";
import { PaymentQrResponse } from "@/types/response/order.response";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type PaymentByTokenOptions = Omit<
  UseQueryOptions<PaymentQrResponse, Error>,
  "queryKey" | "queryFn"
>;

export const useGetPaymentByToken = (
  tokenUrl: string,
  options?: PaymentByTokenOptions,
) =>
  useQuery({
    queryKey: ["payment-by-token", tokenUrl] as const,
    queryFn: async () => {
      const response = await paymentService.getPaymentQrByToken(tokenUrl);
      return response;
    },
    ...options,
  });
