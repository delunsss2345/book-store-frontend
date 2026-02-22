import { authApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useResetPasswordValidateMutation = () =>
  useMutation({
    mutationFn: authApi.resetPasswordValidate,
  });
