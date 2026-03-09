import {
  ApiResponse,
  PaginationResponse,
  ProxySuccessResponse,
} from "@/types/response/base.response";

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
  price: string;
  currencyCode: string;
  isActive: boolean;
};

// --- Admin Book ---
export type AdminBook = {
  id: string;
  publisherId: string;
  publicationYear: number;
  pageCount: number;
  weightGrams: number;
  coverImageUrl: string | null;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  translation: AdminBookTranslation;
  variants: AdminBookVariant[];
};

// --- Admin Book List (Paginated) ---

export type AdminBookListData = PaginationResponse<AdminBook>;

export type AdminBookStats = {
  totalBooks: number;
  activeBooks: number;
  totalAuthors: number;
  totalPublishers: number;
};

// --- API Response Types ---

export type AdminBookListResponse = ApiResponse<AdminBookListData>;
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

export type AdminCategoryStatsProxyResponse =
  ProxySuccessResponse<AdminCategoryStats>;

// --- Admin Order ---

export type AdminOrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | (string & {});

export type AdminPaymentStatus = "UNPAID" | "PAID" | "REFUNDED" | (string & {});

export type AdminOrderItem = {
  id: string;
  productName?: string;
  quantity: number;
  unitPrice: number | string;
  lineTotal: number | string;
};

export type AdminOrder = {
  id: string;
  orderCode: string;
  guestEmail?: string;
  status: AdminOrderStatus;
  paymentStatus: AdminPaymentStatus;
  totalAmount: number | string;
  placedAt?: string;
  createdAt?: string;
  items?: AdminOrderItem[];
};

export type AdminOrderListData = PaginationResponse<AdminOrder>;
export type AdminOrderListResponse = ApiResponse<AdminOrderListData>;
