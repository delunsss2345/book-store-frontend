import { permissionApi } from "@/services/permission.service";
import { useMutation } from "@tanstack/react-query";

export const useDeletePermissionMutation = () =>
  useMutation({
    mutationFn: permissionApi.delete,
  });
