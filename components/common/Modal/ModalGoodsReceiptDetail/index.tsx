"use client";

import { useModalStore } from "@/features/modal";
import { useQueryGoodsReceiptDetail } from "@/features/goods-receipt/hooks/goods-receipt.query";
import { LoadingLazy } from "../../LoadingLazy";
import { GoodsReceiptDetailItem } from "@/types/response/goods-receipt.response";

export default function ModalGoodsReceiptDetail() {
  const goodsReceiptId = useModalStore((state) => state.goodsReceiptId);
  const { data: goodsReceiptDetail, isLoading } = useQueryGoodsReceiptDetail(
    goodsReceiptId as string,
  );

  if (isLoading || !goodsReceiptId || !goodsReceiptDetail)
    return <LoadingLazy />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          Chi tiết phiếu nhập kho
        </h2>
        <span className="text-sm text-slate-500 font-medium">
          Mã phiếu: <span className="text-blue-600">#{goodsReceiptId}</span>
        </span>
      </div>

      <div className="rounded-lg border border-slate-200 shadow-sm">
        <table className="text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3">Sản phẩm</th>
              <th className="px-4 py-3">Định dạng</th>
              <th className="px-4 py-3 text-right">Số lượng</th>
              <th className="px-4 py-3 text-right">Giá nhập</th>
              <th className="px-4 py-3 text-right">Thành tiền</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {goodsReceiptDetail.items.map((item) => (
              <DetailTableRow key={item.id} item={item} />
            ))}
          </tbody>
          <tfoot className="bg-slate-50 font-semibold text-slate-900">
            <tr>
              <td colSpan={4} className="px-4 py-3 text-right">
                Tổng cộng:
              </td>
              <td className="px-4 py-3 text-right text-blue-600 text-base">
                {calculateTotal(goodsReceiptDetail.items).toLocaleString(
                  "vi-VN",
                )}{" "}
                đ
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

function DetailTableRow({ item }: { item: GoodsReceiptDetailItem }) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-4 py-4">
        <div className="font-medium text-slate-900">{item.title}</div>
        <div className="text-xs text-slate-400">ID: {item.bookVariantId}</div>
      </td>
      <td className="px-4 py-4 text-slate-600">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
          {item.format}
        </span>
      </td>
      <td className="px-4 py-4 text-right font-medium">{item.quantity}</td>
      <td className="px-4 py-4 text-right text-slate-600">
        {item.importPrice.toLocaleString("vi-VN")} đ
      </td>
      <td className="px-4 py-4 text-right font-semibold text-slate-900">
        {(item.quantity * item.importPrice).toLocaleString("vi-VN")} đ
      </td>
    </tr>
  );
}

const calculateTotal = (items: GoodsReceiptDetailItem[]) => {
  return items.reduce((sum, item) => sum + item.quantity * item.importPrice, 0);
};
