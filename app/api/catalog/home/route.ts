import { PER_PAGE } from "@/constants/pagination";
import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HomeResponse } from "@/types/response/catalog.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(async () => {
  const response = await api.get<HomeResponse>(
    `catalog/home?limit=${PER_PAGE}`,
  );
  return ResponseApi.success(response.data);
});
