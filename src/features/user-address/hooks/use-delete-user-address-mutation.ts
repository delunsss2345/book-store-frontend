import { userAddressApi } from "@/services/user-address.service";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { UserAddressData, UserDeleteAddressResponse } from "@/types/response/user-address.response";

export const useDeleteUserAddressMutation = () =>
  useMutation({
    mutationFn: (id: string) => userAddressApi.delete(id),
    onSuccess : (response : UserDeleteAddressResponse) => {
      queryClient.setQueryData(["addresses"] , (addresses : UserAddressData[]) => {
        const addressesNew = addresses.filter(address => address.id !== response.data.deleteId)
        return addressesNew
      })
    }
  });
