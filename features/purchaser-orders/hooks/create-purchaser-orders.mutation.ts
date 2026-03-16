import { useMutation } from "@tanstack/react-query";
import { CreatePurchaseOrderSchemaType } from "@/validation/supplier/supplier.validation";
import { purchaserService } from "@/services/purchase-order.service";

export const useCreatePurchaseOrderMutation = () => {
  return useMutation({
    mutationFn: (data: CreatePurchaseOrderSchemaType) => {
      return purchaserService.create(data);
    },
  });
};
