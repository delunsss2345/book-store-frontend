import type { GetCategoriesQuery } from "@/types/request/category.request";
import type {
  CategoryItemData,
  CategoryListData,
} from "@/types/response/category.response";
import type {
  AdminOrder,
  AdminOrderListData,
  AdminUser,
  AdminUserListData,
} from "@/types/response/admin.response";
import type { ProxyResponse } from "@/types/response/base.response";
import { http } from "@/utils/http";

type CategoryListPayload = CategoryListData | CategoryItemData[];
type AdminUsersPayload = AdminUserListData | AdminUser[];
type AdminOrdersPayload = AdminOrderListData | AdminOrder[];

export const dashboardService = {
  getCategories: (params?: GetCategoriesQuery) =>
    http.get<ProxyResponse<CategoryListPayload>>("/categories", { params }),

  getAdminUsers: () =>
    http.get<ProxyResponse<AdminUsersPayload>>("/admin/users"),

  getAdminOrders: () =>
    http.get<ProxyResponse<AdminOrdersPayload>>("/admin/orders"),
};
