import { adminService } from "@/services/admin.service";
import { AdminBookDetail } from "@/types/request/admin.request";
import { ProxySuccessResponse } from "@/types/response/base.response";
import { useQuery } from "@tanstack/react-query";

export const useAdminBookQuery = (bookId: string, type?: string) => {
  return useQuery<
    ProxySuccessResponse<AdminBookDetail>,
    Error,
    AdminBookDetail
  >({
    queryKey: ["admin", "books", bookId],
    queryFn: () => adminService.getBookById(bookId, type),
    select: (response) => response.data,
    enabled: !!bookId,
  });
};
