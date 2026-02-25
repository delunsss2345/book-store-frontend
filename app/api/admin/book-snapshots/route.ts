import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";

// GET /api/v1/admin/book-snapshots
export async function GET() {
  try {
    const response = await api.get("admin/book-snapshots");
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Admin Book Snapshots API Error:", error);
    }
    return ResponseApi.error(
      error.message,
      error.status ?? HttpStatusCode.BadRequest,
    );
  }
}
