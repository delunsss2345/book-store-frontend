import { userAddressApi } from "@/services/user-address.service";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUserAddressMutation = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) => userAddressApi.delete(id),
  });
