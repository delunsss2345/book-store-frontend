import { api, HttpError } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { SupplierItemResponse } from "@/types/response/supplier.response";
import { HttpStatusCode } from "axios";

export const PATCH = wrapperHandler(
  async ({ params }: { params: { supplierId: string } }) => {
    const response = await api.patch<SupplierItemResponse>(
      `/suppliers/${params.supplierId}/active`,
    );
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  },
);
