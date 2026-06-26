import { purchaserService } from "@/services/purchase-order.service";
import {
  ApprovePurchaseOrderRequest,
  CreatePurchaseOrderRequest,
  GetPurchaseOrdersQuery,
} from "@/types/request/purchase-order.request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const purchase_key = {
  all: ["purchase-orders"],
  list: (query?: GetPurchaseOrdersQuery) => [...purchase_key.all, "list", query],
};

export const useCreatePurchaseOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePurchaseOrderRequest) => {
      return purchaserService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchase_key.all });
    },
  });
};

export const useGetPurchaseOrdersQuery = (query?: GetPurchaseOrdersQuery) => {
  return useQuery({
    queryKey: purchase_key.list(query),
    queryFn: () => purchaserService.getAll(query),
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

export const useTransferProcessingPurchaseOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (purchaseOrderId: string) =>
      purchaserService.transferProcessing(purchaseOrderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchase_key.all });
      queryClient.invalidateQueries({ queryKey: ["purchaser-order-detail"] });
    },
  });
};
