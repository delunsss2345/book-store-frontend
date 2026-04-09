import { dashboardService } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";



export const useAdminOrdersQuery = () =>
  useQuery({
    queryKey: ["admin", "orders-admin"],
    queryFn: () => dashboardService.getAdminOrders(),
    select: (response) => (response.data.items),
  });
