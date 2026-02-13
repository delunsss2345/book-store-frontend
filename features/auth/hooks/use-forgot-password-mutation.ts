import { authApi } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

export const useForgotPasswordMutation = () =>
  useMutation({
    mutationFn: authApi.forgotPassword,
  });
