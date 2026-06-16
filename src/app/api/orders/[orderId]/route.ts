import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { GetOrderItemsResponse } from "@/types/response/order.response";

type OrderIdParams = { orderId: string };
export const GET = wrapperHandler<OrderIdParams>(async (request: Request, { params }) => {
  const { orderId } = await params;
  const response = await api.get<GetOrderItemsResponse>(`orders/${orderId}`);
  return ResponseApi.success(response.data, response.status);
});
