import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ roleId: string }> },
  ) => {
    const { roleId } = await params;
    const response = await api.get<any>(`role-permission/role/${roleId}`);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  },
);
