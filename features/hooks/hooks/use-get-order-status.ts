import { hooksApi } from "@/services/hooks.service";
import { OrderStatusResponse } from "@/types/response/order.response";
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
type OrderStatusOptions = Omit<
    UseQueryOptions<OrderStatusResponse, Error, OrderStatusResponse, QueryKey>,
    "queryKey" | "queryFn"
>;
export const useQueryOrderStatus = (orderCode: string, options?: OrderStatusOptions) =>
    useQuery({
        queryKey: ["order-status", orderCode] as const,
        queryFn: async () => hooksApi.getOrderStatus(orderCode),
        enabled: !!orderCode,
        ...options,
    });