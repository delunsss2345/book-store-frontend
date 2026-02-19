import { useAuthStore } from "@/features/auth/store/auth.store";
import { selectorSession } from "@/features/auth/selector/auth.selector";
import { authApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
    const setSession = useAuthStore(selectorSession);

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
