import { useMutation, useQuery } from "@tanstack/react-query";
import { CreatePurchaseOrderRequest } from "@/types/request/purchase-order.request";
import { purchaserService } from "@/services/purchase-order.service";

const purchase_key = {
  all: ["purchase-orders"],
  list: () => [...purchase_key.all, "list"],
};

export const useCreatePurchaseOrderMutation = () => {
  return useMutation({
    mutationFn: (data: CreatePurchaseOrderRequest) => {
      return purchaserService.create(data);
    },
  });
};

export const useGetPurchaseOrdersQuery = () => {
  return useQuery({
    queryKey: purchase_key.all,
    queryFn: () => purchaserService.getAll(),
    select: (response) => response.data,
  });
};
