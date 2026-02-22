import { ApiResponse } from "@/types/response/base.response";

export type HealthData = {
  status: string;
  uptime?: number;
};

export type HealthResponse = ApiResponse<HealthData>;
