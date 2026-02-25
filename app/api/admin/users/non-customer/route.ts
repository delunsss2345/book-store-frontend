import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";

// GET /api/v1/admin/users/non-customer
export async function GET() {
  try {
    const response = await api.get("admin/users/non-customer");
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Admin Get Non-Customer Users API Error:", error);
    }
    return ResponseApi.error(
      error.message,
      error.status ?? HttpStatusCode.BadRequest,
    );
  }
}
