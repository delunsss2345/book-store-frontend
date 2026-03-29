import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";

export const ORDER_ITEMS_QUERY_KEY = {
  all: ["orders"],
  detail: (orderId: string) => [...ORDER_ITEMS_QUERY_KEY.all, "items", orderId],
};

export const useQueryOrderItems = (orderId: string | null) => {
  return useQuery({
    queryKey: ORDER_ITEMS_QUERY_KEY.detail(orderId as string),
    queryFn: () => orderService.getOrderItems(orderId as string),
    select: (response) => response.data,
  });
};
