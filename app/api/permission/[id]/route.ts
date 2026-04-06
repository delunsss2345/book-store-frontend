import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const PATCH = wrapperHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const payload = await request.json();
    const response = await api.patch<any>(`permission/${id}`, payload);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  },
);

export const DELETE = wrapperHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const response = await api.delete<any>(`permission/${id}`);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  },
);
