import { adminService } from "@/services/admin.service";
import { AdminUpdatePriceVariantPayload } from "@/types/request/admin.request";
import { useMutation } from "@tanstack/react-query";

export const useUpdateBookVariantPriceMutation = () =>
  useMutation({
    mutationFn: ({
      variantId,
      payload,
    }: {
      variantId: string;
      payload: AdminUpdatePriceVariantPayload;
    }) => adminService.updateBookVariantPrice(variantId, payload),
  });
