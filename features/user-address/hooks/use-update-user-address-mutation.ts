import { userAddressApi } from "@/services/user-address.service";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUserAddressMutation = () =>
  useMutation({
    mutationFn: ({ userId, id, ...payload }: { userId: string; id: string } & Parameters<typeof userAddressApi.update>[2]) =>
      userAddressApi.update(userId, id, payload),
  });
