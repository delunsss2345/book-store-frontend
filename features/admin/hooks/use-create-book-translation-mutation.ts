import { adminService } from "@/services/admin.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateBookTranslationMutation = () =>
  useMutation({
    mutationFn: ({ bookId, payload }: { bookId: string; payload: any }) =>
      adminService.createBookTranslation(bookId, payload),
  });
