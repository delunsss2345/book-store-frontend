import { adminService } from "@/services/admin.service";
import type {
  AdminCategoryStats,
  AdminCategoryStatsProxyResponse,
} from "@/types/response/admin.response";
import { useQuery } from "@tanstack/react-query";

export const useAdminCategoriesStatsQuery = () =>
  useQuery<AdminCategoryStatsProxyResponse, Error, AdminCategoryStats>({
    queryKey: ["admin", "categories", "stats"],
    queryFn: adminService.getCategoriesStats,
    select: (response) => response.data,
  });
