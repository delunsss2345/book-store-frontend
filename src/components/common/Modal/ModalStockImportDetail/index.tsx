"use client";

import { useModalStore } from "@/features/modal";
import { useStockImportDetailQuery } from "@/features/stock-import";
import { StockImportDetailItem } from "@/types/response/stock-import.response";
import LoadingState from "../../LoadingState";

export default function ModalStockImportDetail({
  onClose,
}: {
  onClose: () => void;
}) {
  const purchaseOrderId = useModalStore((state) => state.purchaseOrderId);
  const {
    data: stockImportDetail,
    isError,
    isLoading,
  } = useStockImportDetailQuery(purchaseOrderId);

  if (isLoading || !purchaseOrderId) return <LoadingState />;

  if (isError || !stockImportDetail) {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Chi tiết nhập kho
          </h2>
          <p className="mt-1 text-sm text-red-600">
            Không thể tải dữ liệu nhập kho.
          </p>
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

  const items = stockImportDetail.items;
  const totalAmount = Number(stockImportDetail.totalAmount ?? 0);
  const totalLackQuantity = calculateTotalLackQuantity(items);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Chi tiết nhập kho
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {items.length.toLocaleString("vi-VN")} dòng sản phẩm đã kiểm
          </p>
        </div>
        <div className={getTotalSummaryClass(totalAmount)}>
          <p className="text-xs font-medium uppercase">Chênh lệch tiền</p>
          <p className="text-lg font-bold">{formatCurrency(totalAmount)}</p>
        </div>
      </div>

      <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50/70 p-4 text-sm sm:grid-cols-2">
        <InfoItem label="Nhà cung cấp" value={stockImportDetail.supplierName} />
        <InfoItem
          label="Người tạo"
          value={formatCreatorName(stockImportDetail.creator)}
        />
        <InfoItem
          label="Ngày tạo"
          value={formatDate(stockImportDetail.createdAt)}
        />
        <InfoItem
          label="Thiếu / hỏng"
          value={`${totalLackQuantity.toLocaleString("vi-VN")} sản phẩm`}
        />
        {stockImportDetail.note ? (
          <div className="sm:col-span-2">
            <p className="text-xs font-semibold uppercase text-slate-500">
              Ghi chú
            </p>
            <p className="mt-1 font-medium text-slate-900">
              {stockImportDetail.note}
            </p>
          </div>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-600">
              <tr>
                <th className="px-4 py-3">Sản phẩm</th>
                <th className="px-4 py-3 text-center">Thực nhập</th>
                <th className="px-4 py-3 text-center">Thiếu / hỏng</th>
                <th className="px-4 py-3 text-right">Thành tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {items.length > 0 ? (
                items.map((item, index) => (
                  <TableRow key={item.id} index={index} item={item} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    Chưa có sản phẩm nhập kho.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-slate-50 font-semibold text-slate-900">
              <tr>
                <td colSpan={3} className="px-4 py-3 text-right">
                  Tổng cộng:
                </td>
                <td className={getTotalCellClass(totalAmount)}>
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

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-medium text-slate-900">{value}</p>
    </div>
  );
}

function TableRow({
  index,
  item,
}: {
  index: number;
  item: StockImportDetailItem;
}) {
  return (
    <tr className="transition-colors hover:bg-slate-50">
      <td className="px-4 py-4">
        <div className="font-medium text-slate-900">Sản phẩm {index + 1}</div>
      </td>
      <td className="px-4 py-4 text-center font-semibold text-slate-900">
        {item.realQuantity.toLocaleString("vi-VN")}
      </td>
      <td className="px-4 py-4 text-center">
        <span className="inline-flex min-w-10 justify-center rounded-md bg-red-50 px-2 py-1 text-sm font-semibold text-red-700">
          {item.lackQuantity.toLocaleString("vi-VN")}
        </span>
      </td>
      <td className="px-4 py-4 text-right font-bold text-slate-900">
        {formatCurrency(item.totalPrice)}
      </td>
    </tr>
  );
}

const calculateTotalLackQuantity = (items: StockImportDetailItem[]) => {
  return items.reduce((sum, item) => sum + item.lackQuantity, 0);
};

const formatCurrency = (value: number | string | null | undefined) => {
  const amount = Number(value ?? 0);

  return `${amount.toLocaleString("vi-VN")} đ`;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const formatCreatorName = (creator: {
  firstName: string;
  lastName: string;
}) => {
  return `${creator.lastName} ${creator.firstName}`.trim();
};

const getTotalSummaryClass = (value: number) => {
  const colorClass =
    value < 0
      ? "border-red-100 bg-red-50 text-red-700"
      : "border-emerald-100 bg-emerald-50 text-emerald-700";

  return `rounded-md border px-3 py-2 text-right ${colorClass}`;
};

const getTotalCellClass = (value: number) => {
  const colorClass = value < 0 ? "text-red-700" : "text-emerald-700";

  return `px-4 py-3 text-right text-base ${colorClass}`;
};
