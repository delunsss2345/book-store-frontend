import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { LogoutResponse } from "@/types/response/auth.response";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";

export const POST = wrapperHandler(async (request: Request) => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  cookieStore.delete("refreshToken");
  cookieStore.delete("accessToken");
  cookieStore.delete("guestSessionId");

  const response = await api.post<LogoutResponse>("auth/logout", {
    refreshToken,
  });
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
