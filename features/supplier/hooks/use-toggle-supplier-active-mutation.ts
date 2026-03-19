import { supplierApi } from "@/services/supplier.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleSupplierActiveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (supplierId: string) =>
      supplierApi.toggleSupplierActive(supplierId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
};
