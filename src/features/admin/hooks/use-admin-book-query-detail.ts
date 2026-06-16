import { adminService } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminBookDetailQuery = () =>
  useQuery({
    queryKey: ["admin", "book-detail"],
    queryFn: adminService.getBookSnapshots,
    select: (response: any) => response.data,
  });
