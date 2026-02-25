import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";

type Params = { params: Promise<{ orderId: string }> };

// GET /api/v1/admin/order-details/{orderId}
export async function GET(_request: Request, { params }: Params) {
  try {
    const { orderId } = await params;
    const response = await api.get(`admin/order-details/${orderId}`);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Admin Get Order Details API Error:", error);
    }
    return ResponseApi.error(
      error.message,
      error.status ?? HttpStatusCode.BadRequest,
    );
  }
}
