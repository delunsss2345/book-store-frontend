import { adminService } from "@/services/admin.service";
import {
  AdminBook,
  AdminBookListResponse,
} from "@/types/response/admin.response";
import { useQuery } from "@tanstack/react-query";

export const useAdminBooksQuery = <T = AdminBook[]>(
  params?: { page?: number; limit?: number; searchPhrase?: string; isbn?: string },
  select?: (data: AdminBookListResponse) => T
) =>
  useQuery<AdminBookListResponse, Error, T>({
    queryKey: ["admin", "books", params],
    queryFn: () => adminService.getBooks(params),
    select: select || ((response) => response.data.items as unknown as T),
  });
