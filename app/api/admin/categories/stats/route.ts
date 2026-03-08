import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import type { AdminCategoryStats } from "@/types/response/admin.response";
import { HttpStatusCode } from "axios";

export async function GET() {
  try {
    const response = await api.get<AdminCategoryStats>("admin/categories/stats");
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  } catch (error: unknown) {
    const apiError = error as { message?: string; status?: number };

    if (process.env.NODE_ENV === "development") {
      console.error("Admin Get Category Stats API Error:", apiError);
    }
    return ResponseApi.error(
      apiError.message ?? "Unable to load category stats",
      apiError.status ?? HttpStatusCode.BadRequest,
    );
  }
}
