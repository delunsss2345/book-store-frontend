import { adminService } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminUsersQuery = () =>
  useQuery({
    queryKey: ["admin", "users"],
    queryFn: adminService.getUsers,
    select: (response: any) => response.data,
  });
