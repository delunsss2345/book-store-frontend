import { dashboardService } from "@/services/dashboard.service";
import type {
  AdminUser,
  AdminUserListData,
} from "@/types/response/admin.response";
import { useQuery } from "@tanstack/react-query";

const normalizeAdminUsers = (
  data?: AdminUserListData | AdminUser[],
): AdminUser[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.items ?? [];
};

const fetchAdminUsers = async (): Promise<AdminUserListData | AdminUser[]> => {
  const payload = await dashboardService.getAdminUsers();

  if (!payload.success) {
    const message = payload.message ?? "Unable to load users";
    throw new Error(message);
  }

  return payload.data;
};

export const useAdminUsersQuery = () =>
  useQuery<AdminUserListData | AdminUser[], Error, AdminUser[]>({
    queryKey: ["admin", "users"],
    queryFn: fetchAdminUsers,
    select: normalizeAdminUsers,
  });
