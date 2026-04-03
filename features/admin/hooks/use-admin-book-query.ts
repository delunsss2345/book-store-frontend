import { adminService } from "@/services/admin.service";
import { AdminBookDetail } from "@/types/request/admin.request";
import { AdminBook } from "@/types/response/admin.response";
import { ProxySuccessResponse } from "@/types/response/base.response";
import { useQuery } from "@tanstack/react-query";

export const useAdminBookQuery = (bookId: string) =>
  useQuery<ProxySuccessResponse<AdminBookDetail>, Error, AdminBookDetail>({
    queryKey: ["admin", "books", bookId],
    queryFn: () => adminService.getBookById(bookId),
    select: (response) => response.data,
    enabled: !!bookId,
  });
