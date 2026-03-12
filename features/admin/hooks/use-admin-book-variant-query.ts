import { adminService } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminBookVariantsQuery = () =>
  useQuery({
    queryKey: ["admin", "book-variants"],
    queryFn: adminService.getBookVariants,
    select: (response) => response.data,
  });
