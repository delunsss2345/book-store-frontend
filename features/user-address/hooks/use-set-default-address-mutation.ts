import { queryClient } from "@/lib/query-client";
import { userAddressApi } from "@/services/user-address.service";
import { UserAddressData } from "@/types/response/user-address.response";
import { useMutation } from "@tanstack/react-query";

export const useSetDefaultAddressMutation = () =>
  useMutation({
    mutationFn: (id: string) => {

      return userAddressApi.setDefault(id)
    },
    onSuccess: (response) => {
      queryClient.setQueryData(["addresses"] , (addresses : UserAddressData[]) => {
        if(addresses.length === 0) return [] ; 
        return addresses.map(address => {
          if(address.id === response.data.id) return  {
            ...response.data,
            isDefault : true
          }
          return {
            ...address,
            isDefault : false
          }
        })
      } )
    },
  });
