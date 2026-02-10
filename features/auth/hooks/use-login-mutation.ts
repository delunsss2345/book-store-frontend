import { useAuthStore } from "@/features/auth/store/auth.store";
import { authApi } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
    const setSession = useAuthStore((s) => s.setSession);

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (res) => {
            setSession({
                user: res.data.user,
                accessToken: res.data.accessToken,
            });
        },
    });
};
