import { useModalStore } from "@/features/modal";
import { supplierApi } from "@/services/supplier.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateSupplierMutation = () => {
  const queryClient = useQueryClient();
  const onClose = useModalStore((state) => state.onClose);
  return useMutation({
    mutationFn: supplierApi.createSupplier,
    onSuccess: () => {
      toast.success("Tạo supplier thành công");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: () => {
      toast.error("Tạo supplier thất bại");
    },
  });
};
