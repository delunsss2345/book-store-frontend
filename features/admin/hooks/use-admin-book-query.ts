import { adminService } from "@/services/admin.service";
import { AdminBook } from "@/types/response/admin.response";
import { ProxySuccessResponse } from "@/types/response/base.response";
import { useQuery } from "@tanstack/react-query";

export const useAdminBookQuery = (bookId: string) =>
  useQuery<ProxySuccessResponse<AdminBook>, Error, AdminBook>({
    queryKey: ["admin", "books", bookId],
    queryFn: () => adminService.getBookById(bookId),
    select: (response) => response.data,
    enabled: !!bookId,
  });
