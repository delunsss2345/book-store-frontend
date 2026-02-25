import { http } from "@/utils/http";

export const adminService = {
  // Books
  getBooks: () => http.get("admin/books"),

  createBook: (payload: any) => http.post("admin/books", payload),

  updateBook: (bookId: string, payload: any) =>
    http.patch(`admin/books/${bookId}`, payload),

  deleteBook: (bookId: string) => http.del(`admin/books/${bookId}`),

  // Book Translations
  createBookTranslation: (bookId: string, payload: any) =>
    http.post(`admin/books/${bookId}/translations`, payload),

  // Book Snapshots
  getBookSnapshots: () => http.get("admin/book-snapshots"),

  // Users
  getUsers: () => http.get("admin/users"),

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
