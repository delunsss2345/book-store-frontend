import { ApiResponse, PaginationResponse, ProxySuccessResponse } from "./base.response";

export enum AdminOrderStatus {
  PENDING_PAYMENT = "PENDING_PAYMENT",
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
  CONFIRMED = "CONFIRMED",
}

export enum AdminPaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
  FAILED = "FAILED",
}

export enum UserAddressType {
  HOME = "HOME",
  WORK = "WORK",
  OTHER = "OTHER",
}

export type UserAddress = {
  id: string;
  userId: string;
  recipientName: string;
  phoneNumber: string;
  addressDetail: string;
  addressType: UserAddressType | string;
  city: string;
  district: string;
  ward: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export interface AdminOrderAddress {
  id: string;
  orderId: string;
  addressLine: string;
  city: string;
  countryCode: string | null;
  district: string | null;
  ward: string | null;
  recipientName: string;
  phoneNumber: string;
  note: string | null;
}

export type AdminOrderUserSummary = {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
};

export type AdminOrderBase = {
  id: string;
  orderCode: string;
  status: AdminOrderStatus | string | null;
  paymentStatus: AdminPaymentStatus | string | null;
  subtotal: string | null;
  discountAmount: string | null;
  shippingFee: string | null;
  totalAmount: string | null;
  currencyCode: string | null;
  placedAt: string | null;
  createdAt: string;
  expiredAt: string;
  updatedAt: string;
};

export type AdminGuestOrder = AdminOrderBase & {
  guestSessionId: string | null;
  guestEmail: string | null;
  address: AdminOrderAddress | null;
};

export type AdminUserOrder = AdminOrderBase & {
  userId: string | null;
  user: AdminOrderUserSummary | null;
  addressUser: UserAddress | null;
};

export type AdminOrder = AdminGuestOrder | AdminUserOrder;

// GET /admin/orders
export type AdminGuestOrderListData = PaginationResponse<AdminGuestOrder>;
export type AdminGuestOrderListResponse = ApiResponse<AdminGuestOrderListData>;

// GET /admin/orders/user
export type AdminUserOrderListData = PaginationResponse<AdminUserOrder>;
export type AdminUserOrderListResponse = ApiResponse<AdminUserOrderListData>;

// Order detail
export type AdminOrderItem = {
  id: string;
  bookVariantSnapshotId: string;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
  createdAt: string;
  titleSnapshot: string | null;
  coverImageUrlSnapshot: string | null;
  skuSnapshot: string;
  priceSnapshot: string;
  currencyCodeSnapshot: string | null;
  formatSnapshot: string;
  editionSnapshot: number | null;
  isbnSnapshot: string | null;
};

export type AdminOrderDetails = {
  items: AdminOrderItem[];
};

export type AdminOrderDetailResponse = ApiResponse<AdminOrderDetails>;

// --- Admin Book Translation ---
export type AdminBookTranslation = {
  id: string;
  languageId: number;
  title: string;
  description: string;
  slug: string;
};

// --- Admin Book Variant ---
export type AdminBookVariant = {
  id: string;
  format: "PAPERBACK" | "HARDCOVER" | "EBOOK" | "AUDIOBOOK" | (string & {});
  edition: number;
  isbn: string;
  costPrice: string;
  price: string;
  currencyCode: string;
  stock: number;
  isActive: boolean;
};

export type AdminBook = {
  id: string;
  coverImageUrl?: string | null;
  translation: any;
  pageCount?: number | null;
  isActive?: boolean;
};

export type AdminBookListItem = {
  id: string;
  title: string;
  description: string;
  slug: string;
  authors: string;
  isActive: boolean;
  coverImageUrl: string | null;
  spec?: {
    widthCm?: number;
    heightCm?: number;
    thicknessCm?: number;
    packaging?: string;
  };
};

export type AdminBookListData = PaginationResponse<AdminBookListItem>;
export type AdminBookListResponse = ApiResponse<AdminBookListData>;

export type AdminBookStats = {
  totalBooks: number;
  activeBooks: number;
  totalAuthors: number;
  totalPublishers: number;
};

export type AdminBookResponse = ApiResponse<AdminBook>;
export type AdminBookStatsProxyResponse = ProxySuccessResponse<AdminBookStats>;

// --- Admin User ---
export type AdminUser = {
  id: string;
  email: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  status?: string;
  role?: string;
};

export type AdminUserListData = PaginationResponse<AdminUser>;
export type AdminUserListResponse = ApiResponse<AdminUserListData>;

export type AdminUserStats = {
  totalUsers: number;
  customersLoggedInLast24Hours: number;
};

export type AdminUserStatsProxyResponse = ProxySuccessResponse<AdminUserStats>;

// --- Admin Category ---
export type AdminCategoryStats = {
  totalCategories: number;
  activeCategories: number;
};

export type AdminCategoryStatsProxyResponse = ProxySuccessResponse<AdminCategoryStats>;
