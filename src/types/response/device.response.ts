import { ApiResponse } from "@/types/response/base.response";

export type DeviceData = {
  id: string;
  fingerprint: string;
  userAgent?: string;
  lastSeenAt?: string;
};

export type DeviceListResponse = ApiResponse<DeviceData[]>;
