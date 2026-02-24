import { userAddressApi } from "@/services/user-address.service";
import { useQuery }
 from "@tanstack/react-query";

export const useQueryAddress = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await userAddressApi.getByUser();
      return response.data;
    },
  })
}