import { CreateAdminBookAllRequest } from "@/types/request/admin.request";
import { AdminBookVariantListData } from "@/types/response/admin-book-variant.response";
import {
  AdminBookListResponse,
  AdminBookResponse,
  AdminBookStatsProxyResponse,
  AdminCategoryStatsProxyResponse,
  AdminUserStatsProxyResponse,
  AdminBook,
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
    return http.get<ProxySuccessResponse<AdminBook>>(`admin/books/${bookId}`);
  },

  createBook: (payload: AdminMutationPayload) =>
    http.post("admin/books", payload),

  createBookAll: (payload: CreateAdminBookAllRequest) =>
    http.post<AdminBookResponse>("admin/books/all", payload),

  updateBook: (bookId: string, payload: AdminMutationPayload) =>
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
  getOrders: () => http.get("admin/orders"),

  getOrderDetails: (orderId: string) =>
    http.get(`admin/order-details/${orderId}`),

  // Book Assets
  uploadBookAsset: (formData: FormData) =>
    http.post("admin/book-assets/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
