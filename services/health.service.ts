import type { HealthResponse } from "@/types/response/health.response";
import { http } from "@/utils/http";

export const healthApi = {
  check: () =>
    http.get<HealthResponse>("/health"),
};
