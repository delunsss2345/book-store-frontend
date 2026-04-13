import { adminService } from "@/services/admin.service";
import { AdminUserOrder } from "@/types/response/admin.response";
import { useQuery } from "@tanstack/react-query";

export const useAdminUserOrdersQuery = () =>
  useQuery({
    queryKey: ["admin", "orders", "user"],
    queryFn: () => adminService.getAdminUserOrders(),
    select: (response): AdminUserOrder[] => response.data.items ?? [],
  });
