import { authApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useResetPasswordValidateMutation = () =>
  useMutation({
    mutationFn: async (data: { token: string }) => {
      const response = await authApi.resetPasswordValidate(data);
      return response.data;
    },
  });
