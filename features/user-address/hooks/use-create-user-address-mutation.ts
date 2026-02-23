import { userAddressApi } from "@/services/user-address.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateUserAddressMutation = () =>
  useMutation({
    mutationFn: (payload: Parameters<typeof userAddressApi.create>[0]) =>
      userAddressApi.create(payload),
  });
