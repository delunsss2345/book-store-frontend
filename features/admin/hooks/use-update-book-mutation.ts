import { adminService } from "@/services/admin.service";
import { useMutation } from "@tanstack/react-query";

export const useUpdateBookMutation = () =>
  useMutation({
    mutationFn: ({ bookId, payload }: { bookId: string; payload: any }) =>
      adminService.updateBook(bookId, payload),
  });
