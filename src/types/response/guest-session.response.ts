import { ApiResponse } from "@/types/response/base.response";

export type GuestSessionData = {
  id: string;
  createdAt: string;
  expiresAt?: string;
};

export type GuestSessionListResponse = ApiResponse<GuestSessionData[]>;
export type GuestSessionItemResponse = ApiResponse<GuestSessionData>;
