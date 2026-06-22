import { roleApi } from "@/services/role.service";
import { useQuery } from "@tanstack/react-query";

export const ROLES_QUERY_KEY = ["roles"] as const;

export const useRolesQuery = () => {
  return useQuery({
    queryKey: ROLES_QUERY_KEY,
    queryFn: () => roleApi.getAll().then((res) => res.data),
  });
};
