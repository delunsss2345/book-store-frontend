import { userAddressApi } from "@/services/user-address.service";
import { useMutation } from "@tanstack/react-query";

export const useSetDefaultAddressMutation = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) => userAddressApi.setDefault(id),
  });
