import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { SearchBooksISBNQuickFillResponse } from "@/types/response/search.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export const GET = wrapperHandler(async (request: NextRequest) => {
  const payload = {
    isbn: request.nextUrl.searchParams.get("isbn"),
    lang: request.nextUrl.searchParams.get("lang"),
  };
  const response = await api.get<SearchBooksISBNQuickFillResponse>(
    `search/isbn?isbn=${payload.isbn}&lang=${payload.lang}`,
  );
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
