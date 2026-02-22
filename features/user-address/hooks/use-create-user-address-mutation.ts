import { userAddressApi } from "@/services/user-address.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateUserAddressMutation = () =>
  useMutation({
    mutationFn: ({ userId, ...payload }: { userId: string } & Parameters<typeof userAddressApi.create>[1]) =>
      userAddressApi.create(userId, payload),
  });
