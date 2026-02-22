import { userAddressApi } from "@/services/user-address.service";
import { useMutation } from "@tanstack/react-query";

export const useSetDefaultAddressMutation = () =>
  useMutation({
    mutationFn: ({ userId, id }: { userId: string; id: string }) =>
      userAddressApi.setDefault(userId, id),
  });
