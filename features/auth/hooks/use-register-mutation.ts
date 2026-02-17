import { useAuthStore } from "@/features/auth/store/auth.store";
import { selectorSession } from "@/features/selector";
import { authApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => {
    const setSession = useAuthStore(selectorSession);

    return useMutation({
        mutationFn: authApi.register,
        onSuccess: (res) => {
            setSession({
                user: res.data.user,
                accessToken: res.data.accessToken,
            });
        }
    });
}
