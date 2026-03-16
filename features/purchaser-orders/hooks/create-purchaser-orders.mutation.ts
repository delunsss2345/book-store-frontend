import { useMutation, useQuery } from "@tanstack/react-query";
import { CreatePurchaseOrderSchemaType } from "@/validation/supplier/supplier.validation";
import { purchaserService } from "@/services/purchase-order.service";

const purchase_key = {
  all: ["purchase-orders"],
  list: () => [...purchase_key.all, "list"],
};

export const useCreatePurchaseOrderMutation = () => {
  return useMutation({
    mutationFn: (data: CreatePurchaseOrderSchemaType) => {
      return purchaserService.create(data);
    },
  });
};

export const useGetPurchaseOrdersQuery = () => {
  return useQuery({
    queryKey: purchase_key.all,
    queryFn: () => purchaserService.getAll(),
  });
};
