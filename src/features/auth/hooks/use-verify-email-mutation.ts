import { authApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useVerifyEmailMutation = () =>
  useMutation({
    mutationFn: authApi.verifyEmail,
  });
