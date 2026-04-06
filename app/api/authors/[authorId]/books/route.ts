import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const GET = wrapperHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ authorId: string }> },
  ) => {
    const { authorId } = await params;
    const response = await api.get<any>(`authors/${authorId}/books`);
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  },
);
