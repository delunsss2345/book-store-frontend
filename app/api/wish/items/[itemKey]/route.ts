import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const DELETE = wrapperHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ itemKey: string }> },
  ) => {
    const { itemKey } = await params;
    const response = await api.delete(`wish/items/${itemKey}`);
    const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
    appendSetCookies(res, response.setCookies);
    return res;
  },
);
