import { adminService } from "@/services/admin.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateBookMutation = () =>
  useMutation({
    mutationFn: adminService.createBook,
  });
