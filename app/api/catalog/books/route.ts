import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { CatalogBookListResponse } from "@/types/response/catalog.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const slugCategory = searchParams.get("slugCategory");

  const response = await api.get<CatalogBookListResponse>(
    `catalog/books?page=${page}&limit=${limit}&slugCategory=${encodeURIComponent(slugCategory ?? "")}`,
  );
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
