"use client";

import { useModalStore } from "@/features/modal";
import { useQueryPurchaserOrderDetail } from "@/features/purchaser-orders/hooks/get-purchaser-orders-detail.mutation";
import LoadingState from "../../LoadingState";
import { PurchaseOrderDetailItem } from "@/types/response/purchase-order.response";

export default function ModalPurchaseOrderDetail({
  onClose,
}: {
  onClose: () => void;
}) {
  const purchaseOrderId = useModalStore((state) => state.purchaseOrderId);
  const { data: purchaseOrderDetail, isLoading } = useQueryPurchaserOrderDetail(
    purchaseOrderId as string,
  );

  if (isLoading || !purchaseOrderId || !purchaseOrderDetail)
    return <LoadingState />;

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Chi tiết đơn hàng</h2>
        <span className="text-sm text-slate-500 font-medium">
          Mã đơn: <span className="text-blue-600">#{purchaseOrderId}</span>
        </span>
      </div>

      <div className="rounded-lg border border-slate-200 shadow-sm">
        <table className="text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3">Sản phẩm</th>
              <th className="px-4 py-3">Định dạng</th>
              <th className="px-4 py-3 text-right">Số lượng</th>
              <th className="px-4 py-3 text-right">Đơn giá</th>
              <th className="px-4 py-3 text-right">Thành tiền</th>
              <th className="px-4 py-3 text-center">Ngày tạo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {purchaseOrderDetail.items.map((item) => (
              <TableRow key={item.id} item={item} />
            ))}
          </tbody>
          <tfoot className="bg-slate-50 font-semibold text-slate-900">
            <tr>
              <td colSpan={4} className="px-4 py-3 text-right">
                Tổng cộng:
              </td>
              <td className="px-4 py-3 text-right text-blue-600 text-base">
                {calculateTotal(purchaseOrderDetail.items).toLocaleString(
                  "vi-VN",
                )}{" "}
                đ
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

function TableRow({ item }: { item: PurchaseOrderDetailItem }) {
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
        {item.unitPrice.toLocaleString("vi-VN")} đ
      </td>
      <td className="px-4 py-4 text-right font-semibold text-slate-900">
        {item.totalPrice.toLocaleString("vi-VN")} đ
      </td>
      <td className="px-4 py-4 text-center text-slate-500 text-xs">
        {new Date(item.createdAt).toLocaleDateString("vi-VN")}
      </td>
    </tr>
  );
}

const calculateTotal = (items: PurchaseOrderDetailItem[]) => {
  return items.reduce((sum, item) => sum + item.totalPrice, 0);
};
