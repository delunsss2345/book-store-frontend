import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { NextRequest } from "next/server";

export const POST = wrapperHandler(async (req: NextRequest) => {
  const response = await api.post("orders/user/checkout", req.body);
  return ResponseApi.success(response.data);
});
