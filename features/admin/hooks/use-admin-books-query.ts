import { adminService } from "@/services/admin.service";
import {
  AdminBook,
  AdminBookListResponse,
} from "@/types/response/admin.response";
import { useQuery } from "@tanstack/react-query";

export const useAdminBooksQuery = () =>
  useQuery<AdminBookListResponse, Error, AdminBook[]>({
    queryKey: ["admin", "books"],
    queryFn: adminService.getBooks,
    select: (response) => response.data.items,
  });
