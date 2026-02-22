import { ApiResponse } from "@/types/response/base.response";

export type EmailOutboxItemData = {
  id: string;
  otpType?: string;
  status?: string;
  email: string;
  createdAt: string;
};

export type EmailOutboxListResponse = ApiResponse<EmailOutboxItemData[]>;
