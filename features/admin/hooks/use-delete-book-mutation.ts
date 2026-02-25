import { adminService } from "@/services/admin.service";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBookMutation = () =>
  useMutation({
    mutationFn: adminService.deleteBook,
  });
