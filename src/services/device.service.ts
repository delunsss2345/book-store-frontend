import type { DeviceListResponse } from "@/types/response/device.response";
import { http } from "@/utils/http";

export const deviceApi = {
  getDevices: () =>
    http.get<DeviceListResponse>("/device"),
};
