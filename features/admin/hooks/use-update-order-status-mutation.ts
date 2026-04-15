import { adminService } from "@/services/admin.service";
import { AdminOrderStatus } from "@/types/response/admin.response";
import { ProxySuccessResponse } from "@/types/response/base.response";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateOrderStatusParams {
  orderId: string;
  status: AdminOrderStatus;
}

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ProxySuccessResponse<{ message: string }>,
    Error,
    UpdateOrderStatusParams
  >({
    mutationFn: ({ orderId, status }) =>
      adminService.updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
  });
};
