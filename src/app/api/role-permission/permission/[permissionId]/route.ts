import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ permissionId: string }> },
  ) => {
    const { permissionId } = await params;
    const response = await api.get<any>(
      `role-permission/permission/${permissionId}`,
    );
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  },
);
