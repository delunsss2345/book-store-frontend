import { adminService } from "@/services/admin.service";
import { UpdateAdminBookPayload } from "@/types/request/admin.request";
import { useMutation } from "@tanstack/react-query";

export const useUpdateBookMutation = () =>
  useMutation({
    mutationFn: ({
      bookId,
      payload,
    }: {
      bookId: string;
      payload: UpdateAdminBookPayload;
    }) => adminService.updateBook(bookId, payload),
  });
