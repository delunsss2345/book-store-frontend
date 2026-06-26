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

  const items = purchaseOrderDetail.items;
  const totalAmount = calculateTotal(items);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Chi tiết đơn hàng
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {items.length.toLocaleString("vi-VN")} sản phẩm trong đơn
          </p>
        </div>
        <div className="rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-right">
          <p className="text-xs font-medium uppercase text-blue-700">
            Tổng thanh toán
          </p>
          <p className="text-lg font-bold text-blue-700">
            {formatCurrency(totalAmount)}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3">Sản phẩm</th>
                <th className="px-4 py-3">Định dạng</th>
                <th className="px-4 py-3 text-center">SL</th>
                <th className="px-4 py-3 text-right">Giá gốc</th>
                <th className="px-4 py-3 text-right">CK</th>
                <th className="px-4 py-3 text-right">Giá nhập</th>
                <th className="px-4 py-3 text-right">Thành tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {items.map((item) => (
                <TableRow key={item.id} item={item} />
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-semibold text-slate-900">
              <tr>
                <td colSpan={6} className="px-4 py-3 text-right">
                  Tổng cộng:
                </td>
                <td className="px-4 py-3 text-right text-blue-600 text-base">
                  {formatCurrency(totalAmount)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

function TableRow({ item }: { item: PurchaseOrderDetailItem }) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-4 py-4">
        <div className="font-medium text-slate-900">{item.title}</div>
      </td>
      <td className="px-4 py-4 text-slate-600">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
          {formatBookFormat(item.format)}
        </span>
      </td>
      <td className="px-4 py-4 text-center font-semibold text-slate-900">
        {item.quantity.toLocaleString("vi-VN")}
      </td>
      <td className="px-4 py-4 text-right text-slate-600">
        {formatCurrency(item.unitPrice)}
      </td>
      <td className="px-4 py-4 text-right text-slate-600">
        {formatDiscount(item.discountPrice)}
      </td>
      <td className="px-4 py-4 text-right font-semibold text-slate-900">
        {formatCurrency(getImportPrice(item))}
      </td>
      <td className="px-4 py-4 text-right font-bold text-slate-900">
        {formatCurrency(item.totalPrice)}
      </td>
    </tr>
  );
}

const calculateTotal = (items: PurchaseOrderDetailItem[]) => {
  return items.reduce((sum, item) => sum + item.totalPrice, 0);
};

const formatCurrency = (value: number | string | null | undefined) => {
  const amount = Number(value ?? 0);

  return `${amount.toLocaleString("vi-VN")} đ`;
};

const formatDiscount = (value: number | string | null | undefined) => {
  const discount = Number(value ?? 0);

  if (!discount) return "-";

  return `${discount.toLocaleString("vi-VN")}%`;
};

const getImportPrice = (item: PurchaseOrderDetailItem) => {
  return Number(item.price ?? item.unitPrice);
};

const formatBookFormat = (format: string) => {
  const labels: Record<string, string> = {
    EBOOK: "Ebook",
    HARDCOVER: "Bìa cứng",
    PAPERBACK: "Bìa mềm",
  };

  return labels[format] ?? format;
};
