import { adminService } from "@/services/admin.service";
import type {
  AdminUserStats,
  AdminUserStatsProxyResponse,
} from "@/types/response/admin.response";
import { useQuery } from "@tanstack/react-query";

export const useAdminUsersStatsQuery = () =>
  useQuery<AdminUserStatsProxyResponse, Error, AdminUserStats>({
    queryKey: ["admin", "users", "stats"],
    queryFn: adminService.getUsersStats,
    select: (response) => response.data,
  });
