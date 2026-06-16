import {
  AdminBookDetail,
  CreateAdminBookAllRequest,
  UpdateAdminBookPayload,
} from "@/types/request/admin.request";
import { AdminBookVariantListData } from "@/types/response/admin-book-variant.response";
import {
  AdminBookListResponse,
  AdminBookResponse,
  AdminBookStatsProxyResponse,
  AdminCategoryStatsProxyResponse,
  AdminGuestOrderListData,
  AdminOrderDetails,
  AdminUserOrderListData,
  AdminUserStatsProxyResponse,
  AdminOrderStatus,
} from "@/types/response/admin.response";
import { ProxySuccessResponse } from "@/types/response/base.response";
import { http } from "@/utils/http";

type AdminMutationPayload = Record<string, unknown>;

export const adminService = {
  // Stats
  getBooksStats: () =>
    http.get<AdminBookStatsProxyResponse>("admin/books/stats"),

  getBookVariants: () =>
    http.get<ProxySuccessResponse<AdminBookVariantListData>>(
      "admin/book-variants",
    ),

  getCategoriesStats: () =>
    http.get<AdminCategoryStatsProxyResponse>("admin/categories/stats"),

  getUsersStats: () =>
    http.get<AdminUserStatsProxyResponse>("admin/users/stats"),

  // Books
  getBooks: () => http.get<AdminBookListResponse>("admin/books"),

  getBookById: (bookId: string) => {
    console.log(bookId);
    return http.get<ProxySuccessResponse<AdminBookDetail>>(
      `admin/books/${bookId}`,
    );
  },

  createBook: (payload: AdminMutationPayload) =>
    http.post("admin/books", payload),

  createBookAll: (payload: CreateAdminBookAllRequest) =>
    http.post<AdminBookResponse>("admin/books/all", payload),

  updateBook: (bookId: string, payload: UpdateAdminBookPayload) =>
    http.patch(`admin/books/${bookId}`, payload),

  deleteBook: (bookId: string) => http.del(`admin/books/${bookId}`),

  // Book Translations
  createBookTranslation: (bookId: string, payload: AdminMutationPayload) =>
    http.post(`admin/books/${bookId}/translations`, payload),

  // Book Snapshots
  getBookSnapshots: () => http.get("admin/book-snapshots"),

  // Users
  getUsers: () => http.get("admin/users"),

  // Detail
  getNonCustomerUsers: () => http.get("admin/users/non-customer"),

  // Orders
  getAdminGuestOrders: () =>
    http.get<ProxySuccessResponse<AdminGuestOrderListData>>("admin/orders"),

  getAdminUserOrders: () =>
    http.get<ProxySuccessResponse<AdminUserOrderListData>>("admin/orders/user"),

  getOrderDetails: (orderId: string) =>
    http.get<ProxySuccessResponse<AdminOrderDetails>>(
      `admin/order-details/${orderId}`,
    ),

  updateOrderStatus: (
    orderId: string,
    status: AdminOrderStatus,
    note?: string,
  ) =>
    http.patch<ProxySuccessResponse<{ message: string }>>(
      `admin/orders/${orderId}/status`,
      {
        status,
        note,
      },
    ),

  // Book Assets
  uploadBookAsset: (formData: FormData) =>
    http.post("admin/book-assets/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
