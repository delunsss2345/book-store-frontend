import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { PER_PAGE } from "@/src/constants/pagination";
import { HomeResponse } from "@/types/response/catalog.response";

export const GET = wrapperHandler(async () => {
  const response = await api.get<HomeResponse>(
    `catalog/home?limit=${PER_PAGE}`,
  );
  return ResponseApi.success(response.data);
});
