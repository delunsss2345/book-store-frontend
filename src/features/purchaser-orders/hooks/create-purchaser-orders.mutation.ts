import { purchaserService } from "@/services/purchase-order.service";
import {
  ApprovePurchaseOrderRequest,
  CreatePurchaseOrderRequest,
} from "@/types/request/purchase-order.request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const purchase_key = {
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

export const useApprovePurchaseOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      purchaseOrderId,
      data,
    }: {
      purchaseOrderId: string;
      data: ApprovePurchaseOrderRequest;
    }) => purchaserService.approve(purchaseOrderId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchase_key.all });
    },
  });
};
