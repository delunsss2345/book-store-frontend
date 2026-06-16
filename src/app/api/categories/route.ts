import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import {
  CategoryItemResponse,
  CategoryListResponse,
} from "@/types/response/category.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(async (request: Request) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  if (!searchParams.has("page")) {
    searchParams.set("page", "1");
  }
  if (!searchParams.has("limit")) {
    searchParams.set("limit", "30");
  }

  const response = await api.get<CategoryListResponse>(
    `categories?${searchParams.toString()}`,
  );
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});

export const POST = wrapperHandler(async (request: Request) => {
  const payload = await request.json();
  const response = await api.post<CategoryItemResponse>("categories", payload);
  return ResponseApi.success(response.data, HttpStatusCode.Created);
});
