import { adminService } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminOrderDetailsQuery = (orderId: string) =>
  useQuery({
    queryKey: ["admin", "order-details", orderId],
    queryFn: () => adminService.getOrderDetails(orderId),
    enabled: Boolean(orderId),
    select: (response: any) => response.data,
  });
