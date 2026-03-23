import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { wrapperHandler } from "@/lib/api/wrapperHandler";
import { NextRequest } from "next/server";
import { GoodsReceiptDetailResponse } from "@/types/response/goods-receipt.response";

export const GET = wrapperHandler(async (request: NextRequest, { params }) => {
  const { goodsReceiptId } = await params;
  const response = await api.get<GoodsReceiptDetailResponse>(
    `stock-imports/${goodsReceiptId}`,
  );
  return ResponseApi.success(response.data, response.status);
});
