import { hooksApi } from "@/services/hooks.service";
import { PaymentHistoryResponseDto } from "@/types/response/order.response";
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

type PaymentHistoryOptions = Omit<
    UseQueryOptions<PaymentHistoryResponseDto[], Error, PaymentHistoryResponseDto[], QueryKey>,
    "queryKey" | "queryFn"
>;

export const useQueryPaymentHistory = (orderId: number, options?: PaymentHistoryOptions) =>
    useQuery({
        queryKey: ["payment-history", orderId] as const,
        queryFn: async () => {
          const res = await hooksApi.getPaymentHistory(orderId);
          return res.data;
        },
        enabled: !!orderId,
        ...options,
    });
