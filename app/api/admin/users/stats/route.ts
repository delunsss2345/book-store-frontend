import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import type { AdminUserStats } from "@/types/response/admin.response";
import { HttpStatusCode } from "axios";

export async function GET() {
  try {
    const response = await api.get<AdminUserStats>("admin/users/stats");
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  } catch (error: unknown) {
    const apiError = error as { message?: string; status?: number };

    if (process.env.NODE_ENV === "development") {
      console.error("Admin Get User Stats API Error:", apiError);
    }
    return ResponseApi.error(
      apiError.message ?? "Unable to load user stats",
      apiError.status ?? HttpStatusCode.BadRequest,
    );
  }
}
