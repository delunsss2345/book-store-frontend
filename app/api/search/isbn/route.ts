import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { SearchBooksISBNQuickFillResponse } from "@/types/response/search.response";
import { HttpStatusCode } from "axios";

export const GET = wrapperHandler(async (request: Request) => {
  const payloadUrl = new URL(request.url);
  const payload = {
    isbn: payloadUrl.searchParams.get("isbn"),
    lang: payloadUrl.searchParams.get("lang"),
  };
  const response = await api.get<SearchBooksISBNQuickFillResponse>(
    `search/isbn?isbn=${payload.isbn}&lang=${payload.lang}`,
  );
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
