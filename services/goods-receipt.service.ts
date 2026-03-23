import { http } from "@/utils/http";
import {
  GoodsReceiptDetailResponse,
  GoodsReceiptListResponse,
} from "@/types/response/goods-receipt.response";

export const goodsReceiptService = {
  getAll: () => {
    return http.get<GoodsReceiptListResponse>("/goods-receipt");
  },

  getById: (id: string) => {
    return http.get<GoodsReceiptDetailResponse>(`/goods-receipt/${id}`);
  },
};
