import { permissionApi } from "@/services/permission.service";
import { useMutation } from "@tanstack/react-query";

export const useCreatePermissionMutation = () =>
  useMutation({
    mutationFn: permissionApi.create,
  });
