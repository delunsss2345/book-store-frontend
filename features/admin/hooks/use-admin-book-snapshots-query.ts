import { adminService } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminBookSnapshotsQuery = () =>
  useQuery({
    queryKey: ["admin", "book-snapshots"],
    queryFn: adminService.getBookSnapshots,
    select: (response: any) => response.data,
  });
