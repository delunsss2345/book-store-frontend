import { adminService } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminBooksQuery = () =>
  useQuery({
    queryKey: ["admin", "books"],
    queryFn: adminService.getBooks,
    select: (response: any) => response.data,
  });
