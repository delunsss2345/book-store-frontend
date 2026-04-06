import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { OrderStatusResponse } from "@/types/response/order.response";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ orderId: string }> },
  ) => {
    const { orderId } = await params;
    const response = await api.get<OrderStatusResponse>(
      `hooks/${orderId}/status`,
    );
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  },
);
