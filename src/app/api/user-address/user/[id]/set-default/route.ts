import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const PATCH = wrapperHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const payload = await params;
    const response = await api.patch<any>(
      `user-address/user/${payload.id}/set-default`,
      {},
    );
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  },
);
