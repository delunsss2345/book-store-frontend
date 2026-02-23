import { userAddressApi } from "@/services/user-address.service";
import { useQuery }
 from "@tanstack/react-query";

export const useQueryAddress = () =>
  useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await userAddressApi.getByUser();
      return response.data;
    },
  });