import { orderService } from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";

export const ORDER_ITEMS_QUERY_KEY = {
  all: ["orders"],
  detail: (orderId: string) => [...ORDER_ITEMS_QUERY_KEY.all, "items", orderId],
};

export const useQueryOrderItems = (orderId: string | null) => {
  return useQuery({
    queryKey: ORDER_ITEMS_QUERY_KEY.detail(orderId!),
    queryFn: () => orderService.getOrderItems(orderId!),
    select: (response) => response.data,
    enabled: !!orderId,
  });
};
