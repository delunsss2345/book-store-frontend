import { useAuthStore } from "@/features/auth/store/auth.store";
import { authApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useLogoutMutation = () => {
    const clearSession = useAuthStore((s) => s.clearSession);

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            clearSession()
        },
        onError: () => {
            clearSession()
        }
    });
}
