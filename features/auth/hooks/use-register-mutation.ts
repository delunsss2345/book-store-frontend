import { authApi } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () =>
    useMutation({
        mutationFn: authApi.register,
    });