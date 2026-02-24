import { queryClient } from "@/lib/query-client";
import { userAddressApi } from "@/services/user-address.service";
import { UserAddressData } from "@/types/response/user-address.response";
import { useMutation } from "@tanstack/react-query";

export const useCreateUserAddressMutation = () => {
  return useMutation({
    mutationFn: (payload: Parameters<typeof userAddressApi.create>[0]) =>
      userAddressApi.create(payload),
    onSuccess: (response) => {
      queryClient.setQueryData(["addresses"], (addresses : UserAddressData[]) => {
        return addresses ? [...addresses, response.data] : [response.data];
      });
    },
  });
};
