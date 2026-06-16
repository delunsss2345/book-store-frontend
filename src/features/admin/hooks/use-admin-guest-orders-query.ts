import { adminService } from "@/services/admin.service";
import { AdminGuestOrder } from "@/types/response/admin.response";
import { useQuery } from "@tanstack/react-query";

export const useAdminGuestOrdersQuery = () =>
  useQuery({
    queryKey: ["admin", "orders", "guest"],
    queryFn: () => adminService.getAdminGuestOrders(),
    select: (response): AdminGuestOrder[] => response.data.items ?? [],
  });
