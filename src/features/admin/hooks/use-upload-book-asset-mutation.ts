import { adminService } from "@/services/admin.service";
import { useMutation } from "@tanstack/react-query";

export const useUploadBookAssetMutation = () =>
  useMutation({
    mutationFn: adminService.uploadBookAsset,
  });
