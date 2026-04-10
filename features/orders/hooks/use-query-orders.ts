import { orderService } from "@/services/order.service";

import { useQuery } from "@tanstack/react-query";

export const ORDERS_QUERY_KEY = ["orders"];

export const useQueryOrder = () =>
    useQuery({
        queryKey: ORDERS_QUERY_KEY,
        queryFn: () => orderService.getOrders(),
        select: (response) => response.data,
    });
