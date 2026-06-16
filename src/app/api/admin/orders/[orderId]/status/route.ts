import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { z } from "zod";
import { AdminOrderStatus } from "@/types/response/admin.response";

const updateOrderStatusSchema = z.object({
  status: z.enum([AdminOrderStatus.CANCELLED, AdminOrderStatus.CONFIRMED]),
});

type OrderIdParams = { orderId: string };

export const PATCH = wrapperHandler<OrderIdParams>(
  async (request: Request, { params }) => {
    const { orderId } = await params;
    const body = await request.json();

    // Validate the request body
    const parsedBody = updateOrderStatusSchema.parse(body);

    const response = await api.patch(
      `admin/orders/${orderId}/status`,
      parsedBody,
    );
    return ResponseApi.success(response.data, response.status);
  },
);
