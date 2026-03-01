import { dashboardService } from "@/services/dashboard.service";
import type {
  AdminOrder,
  AdminOrderListData,
} from "@/types/response/admin.response";
import { useQuery } from "@tanstack/react-query";

const normalizeAdminOrders = (
  data?: AdminOrderListData | AdminOrder[],
): AdminOrder[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.items ?? [];
};

const fetchAdminOrders = async (): Promise<AdminOrderListData | AdminOrder[]> => {
  const payload = await dashboardService.getAdminOrders();

  if (!payload.success) {
    const message = payload.message ?? "Unable to load orders";
    throw new Error(message);
  }

  return payload.data;
};

export const useAdminOrdersQuery = () =>
  useQuery<AdminOrderListData | AdminOrder[], Error, AdminOrder[]>({
    queryKey: ["admin", "orders"],
    queryFn: fetchAdminOrders,
    select: normalizeAdminOrders,
  });
