import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

type Params = { params: Promise<{ orderId: string }> };

export const GET = wrapperHandler<Params>(
  async (_request: Request, { params }: Params) => {
    const { orderId } = await params;
    const response = await api.get(`admin/order-details/${orderId}`);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  },
);
