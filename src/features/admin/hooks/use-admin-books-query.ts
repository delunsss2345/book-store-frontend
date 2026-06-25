import { adminService } from "@/services/admin.service";
import {
  AdminBookListItem,
  AdminBookListResponse,
} from "@/types/response/admin.response";
import { useQuery } from "@tanstack/react-query";

export const useAdminBooksQuery = <T = AdminBookListItem[]>(
  params?: {
    page?: number;
    limit?: number;
    searchPhrase?: string;
    isbn?: string;
    languageId?: number;
  },
  select?: (data: AdminBookListResponse) => T,
) =>
  useQuery<AdminBookListResponse, Error, T>({
    queryKey: ["admin", "books", params],
    queryFn: () => adminService.getBooks(params),
    select: select || ((response) => response.data.items as unknown as T),
  });
