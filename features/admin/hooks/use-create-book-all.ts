import { adminService } from "@/services/admin.service";
import { CreateAdminBookAllRequest } from "@/types/request/admin.request";
import { useMutation } from "@tanstack/react-query";

export const useCreateBookAllMutation = () => {
  return useMutation({
    mutationFn: async (payload: CreateAdminBookAllRequest) => {
      const response = await adminService.createBookAll(payload);
      return response.data;
    },
  });
};
