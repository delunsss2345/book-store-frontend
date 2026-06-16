import { authApi } from "@/services/auth.service"
import { useMutation } from "@tanstack/react-query"

export const useGetMeMutation = () => 
     useMutation({
        mutationFn: authApi.me,
    })
