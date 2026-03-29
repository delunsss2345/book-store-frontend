import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { NextRequest } from "next/server";

export const POST = wrapperHandler(async (req: NextRequest) => {
  const payload = await req.json();
  const response = await api.post("orders/user/checkout", payload);
  return ResponseApi.success(response.data, response.status, response.message);
});
