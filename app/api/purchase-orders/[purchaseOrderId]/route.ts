import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { NextRequest } from "next/server";

export const GET = wrapperHandler(
  async (request: NextRequest, { params: purchaseOrderId }) => {
    const response = await api.get(`/purchase-orders/${purchaseOrderId}`);
    return ResponseApi.success(response.data, response.status);
  },
);
