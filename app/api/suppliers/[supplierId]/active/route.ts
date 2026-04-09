import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { SupplierItemResponse } from "@/types/response/supplier.response";
import { HttpStatusCode } from "axios";

type SupplierIdParams = { supplierId: string };

export const PATCH = wrapperHandler<SupplierIdParams>(
  async (request: Request, { params }) => {
    const { supplierId } = await params;
    const response = await api.patch<SupplierItemResponse>(
      `/suppliers/${supplierId}/active`,
    );
    return ResponseApi.success(response.data, HttpStatusCode.Ok);
  },
);
