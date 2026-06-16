import { adminService } from "@/services/admin.service";
import type {
  AdminBookStats,
  AdminBookStatsProxyResponse,
} from "@/types/response/admin.response";
import { useQuery } from "@tanstack/react-query";

export const useAdminBooksStatsQuery = () =>
  useQuery<AdminBookStatsProxyResponse, Error, AdminBookStats>({
    queryKey: ["admin", "books", "stats"],
    queryFn: adminService.getBooksStats,
    select: (response) => response.data,
  });
