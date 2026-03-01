import axios from "axios";

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

type CategoryListPayload = CategoryListData | CategoryItemData[];
type AdminUsersPayload = AdminUserListData | AdminUser[];
type AdminOrdersPayload = AdminOrderListData | AdminOrder[];

export const dashboardService = {
  getCategories: (params?: GetCategoriesQuery) =>
    axios
      .get<ProxyResponse<CategoryListPayload>>("/api/categories", { params })
      .then((response) => response.data),

  getAdminUsers: () =>
    axios
      .get<ProxyResponse<AdminUsersPayload>>("/api/admin/users")
      .then((response) => response.data),

  getAdminOrders: () =>
    axios
      .get<ProxyResponse<AdminOrdersPayload>>("/api/admin/orders")
      .then((response) => response.data),
};
