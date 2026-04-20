import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

type Params = { tokenUrl: string };

export const GET = wrapperHandler<Params>(async (_req, { params }) => {
  const { tokenUrl } = await params;
  const response = await api.get(`payments/${tokenUrl}/qr`);
  return ResponseApi.success(response.data, HttpStatusCode.Ok);
});
