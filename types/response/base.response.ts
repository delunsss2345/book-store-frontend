export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiError {
  success: "false";
  statusCode: number;
  message: string;
  path: string;
}

export interface PaginationResponse<T> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: T[];
}

export type ProxySuccessResponse<T> = {
  message?: string;
  success: true;
  data: T;
};

export type ProxyErrorResponse = {
  success: false;
  message: string;
  details?: unknown;
};

export type ProxyResponse<T> = ProxySuccessResponse<T>;
