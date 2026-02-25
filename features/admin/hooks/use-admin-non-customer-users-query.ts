import { adminService } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminNonCustomerUsersQuery = () =>
  useQuery({
    queryKey: ["admin", "users", "non-customer"],
    queryFn: adminService.getNonCustomerUsers,
    select: (response: any) => response.data,
  });
