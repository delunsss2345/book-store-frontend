import { useQueryClient } from "@tanstack/react-query";
import { ME_QUERY_KEY } from "@/features/auth/hooks/use-query-me";
import { authApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.register,
        onSuccess: (res) => {
            queryClient.setQueryData(ME_QUERY_KEY, {
                data: res.data.user,
            });
        }
    });
}
