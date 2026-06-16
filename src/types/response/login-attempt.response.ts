import { ApiResponse } from "@/types/response/base.response";

export type LoginAttemptData = {
  id: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  createdAt: string;
};

export type LoginAttemptListResponse = ApiResponse<LoginAttemptData[]>;
