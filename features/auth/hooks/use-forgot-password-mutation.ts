import { authApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useForgotPasswordMutation = () =>
  useMutation({
    mutationFn: authApi.forgotPassword,
  });
