import { useQuery } from "@tanstack/react-query";
import { goodsReceiptService } from "@/services/goods-receipt.service";

export const goods_receipt_key = {
  all: ["goods-receipt"],
  list: () => [...goods_receipt_key.all, "list"],
  detail: (id: string) => [...goods_receipt_key.all, "detail", id],
};

export const useGetGoodsReceiptsQuery = () => {
  return useQuery({
    queryKey: goods_receipt_key.all,
    queryFn: () => goodsReceiptService.getAll(),
    select: (response) => response.data,
  });
};

export const useQueryGoodsReceiptDetail = (goodsReceiptId?: string) => {
  return useQuery({
    queryKey: goods_receipt_key.detail(goodsReceiptId as string),
    queryFn: () => goodsReceiptService.getById(goodsReceiptId as string),
    select: (response) => response.data,
    enabled: !!goodsReceiptId,
  });
};
