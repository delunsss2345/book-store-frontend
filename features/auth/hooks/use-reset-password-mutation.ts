import { authApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useResetPasswordMutation = () =>
  useMutation({
    mutationFn: authApi.resetPassword,
  });
