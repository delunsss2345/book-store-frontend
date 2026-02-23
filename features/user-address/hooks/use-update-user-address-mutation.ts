import { userAddressApi } from "@/services/user-address.service";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUserAddressMutation = () =>
  useMutation({
    mutationFn: ({ id, ...payload }: { id: string } & Parameters<typeof userAddressApi.update>[1]) =>
      userAddressApi.update(id, payload),
  });
