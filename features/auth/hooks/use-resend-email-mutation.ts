import { authApi } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

export const useResendEmailMutation = () =>
  useMutation({
    mutationFn: authApi.resendEmail,
  });
