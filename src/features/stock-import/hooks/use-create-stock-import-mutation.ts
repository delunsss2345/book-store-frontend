import { purchase_key } from "@/features/purchaser-orders/hooks/create-purchaser-orders.mutation";
import { stockImportService } from "@/services/stock-import.service";
import { CreateStockImportRequest } from "@/types/request/purchase-order.request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateStockImportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStockImportRequest) =>
      stockImportService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchase_key.all });
      queryClient.invalidateQueries({ queryKey: ["purchaser-order-detail"] });
    },
  });
};
