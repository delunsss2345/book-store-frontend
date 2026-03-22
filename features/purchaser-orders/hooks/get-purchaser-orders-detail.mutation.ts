import { useQuery } from "@tanstack/react-query";
import { purchaserService } from "@/services/purchase-order.service";

export const useQueryPurchaserOrderDetail = (purchaseOrderId?: string) => {
  return useQuery({
    queryKey: ["purchaser-order-detail", purchaseOrderId],
    queryFn: () => purchaserService.getById(purchaseOrderId as string),
    select: (response) => response.data,
    enabled: !!purchaseOrderId,
  });
};
