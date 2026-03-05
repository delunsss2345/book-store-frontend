import { orderService } from "@/services/order.service";
import type {
    GetOrdersResponse,
    OrderSummary,
} from "@/types/response/order.response";
import { useQuery } from "@tanstack/react-query";

export const ORDERS_QUERY_KEY = ["orders"];

export const useQueryOrder = () =>
    useQuery<GetOrdersResponse, Error, OrderSummary[]>({
        queryKey: ORDERS_QUERY_KEY,
        queryFn: () => orderService.getOrders<GetOrdersResponse>(),
        select: (response) => response.data,
    });
