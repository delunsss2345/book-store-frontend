import { adminService } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminOrdersQuery = () =>
  useQuery({
    queryKey: ["admin", "orders"],
    queryFn: adminService.getOrders,
    select: (response: any) => response.data,
  });
