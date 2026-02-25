import { adminService } from "@/services/admin.service";
import { AdminBookListResponse } from "@/types/response/admin.response";
import { useQuery } from "@tanstack/react-query";

export const useAdminBooksQuery = () =>
  useQuery({
    queryKey: ["admin", "books"],
    queryFn: adminService.getBooks,
    select: (response: AdminBookListResponse) => response.data.items,
  });
