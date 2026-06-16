import { useAuthStore } from "@/features/auth/store/auth.store";
import { selectorSession } from "@/features/auth/selector/auth.selector";
import { authApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => {
    const setSession = useAuthStore(selectorSession);

    return useMutation({
        mutationFn: authApi.register,
        onSuccess: (res) => {
            setSession({
                user: res.data.user,
            });
        }
    });
}
