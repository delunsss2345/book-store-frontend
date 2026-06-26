import { stockImportService } from "@/services/stock-import.service";
import { useQuery } from "@tanstack/react-query";

export const stock_import_key = {
  all: ["stock-imports"] as const,
  detail: (purchaseOrderId?: string | null) =>
    [...stock_import_key.all, "detail", purchaseOrderId] as const,
};

export const useStockImportDetailQuery = (purchaseOrderId?: string | null) => {
  return useQuery({
    queryKey: stock_import_key.detail(purchaseOrderId),
    queryFn: () =>
      stockImportService.getByPurchaseOrderId(purchaseOrderId as string),
    select: (response) => response.data,
    enabled: !!purchaseOrderId,
  });
};
