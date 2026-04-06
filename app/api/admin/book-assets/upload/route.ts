import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

// POST /api/v1/admin/book-assets/upload
export const POST = wrapperHandler(async (request: Request) => {
  const formData = await request.formData();
  const response = await api.post<{ data: unknown }>(
    "admin/book-assets/upload",
    formData,
    {
      headers: { "content-type": "multipart/form-data" },
    },
  );
  return ResponseApi.success(response.data, HttpStatusCode.Created);
});
