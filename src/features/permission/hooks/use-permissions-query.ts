import { permissionApi } from "@/services/permission.service";
import { useQuery } from "@tanstack/react-query";

export const PERMISSIONS_QUERY_KEY = ["permissions"] as const;

export const usePermissionsQuery = () => {
  return useQuery({
    queryKey: PERMISSIONS_QUERY_KEY,
    queryFn: () => permissionApi.getAll().then((res) => res.data),
  });
};
