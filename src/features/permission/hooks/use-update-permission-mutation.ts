import { permissionApi } from "@/services/permission.service";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePermissionMutation = () =>
  useMutation({
    mutationFn: ({ id, ...payload }: { id: string } & Parameters<typeof permissionApi.update>[1]) =>
      permissionApi.update(id, payload),
  });
