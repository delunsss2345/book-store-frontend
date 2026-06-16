import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { LanguageItemData } from "@/types/response/language.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(async (request: Request) => {
  const response = await api.get<LanguageItemData[]>("languages");
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
