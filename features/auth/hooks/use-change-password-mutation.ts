import { authApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useChangePasswordMutation = () =>
  useMutation({
    mutationFn: authApi.changePassword,
  });
