import { rolePermissionApi } from "@/services/role-permission.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateRolePermissionMutation = () =>
  useMutation({
    mutationFn: rolePermissionApi.create,
  });
