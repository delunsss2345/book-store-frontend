import { authApi } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export const ME_QUERY_KEY = ["me"] as const;

export const useQueryMe = () => {
  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: authApi.me,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Do not retry if unauthorized
  });
};
