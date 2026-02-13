import { authApi } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

export const useVerifyEmailMutation = () =>
  useMutation({
    mutationFn: authApi.verifyEmail,
  });
