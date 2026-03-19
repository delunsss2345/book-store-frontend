import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import {
  SupplierItemResponse,
  SupplierListResponse,
} from "@/types/response/supplier.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export const GET = wrapperHandler(async () => {
  const response = await api.get<SupplierListResponse>("suppliers");
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});

export const POST = wrapperHandler(async (request: NextRequest) => {
  const body = await request.json();
  const response = await api.post<SupplierItemResponse>("suppliers", body);
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
