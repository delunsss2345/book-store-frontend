import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { HttpStatusCode } from "axios";

type OrderIdParams = { orderId: string };
export const GET = wrapperHandler<OrderIdParams>(
  async (_request: Request, { params }) => {
    const { orderId } = await params;
    const response = await api.get(`admin/order-details/${orderId}`);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  },
);
