"use client";

import Image from "next/image";
import { useModalStore } from "@/features/modal";
import { useQueryOrderItems } from "@/features/orders/hooks/use-query-order-items";
import { OrderItem } from "@/types/response/order.response";
import LoadingState from "../../LoadingState";
import { Package, ReceiptText } from "lucide-react";

export default function ModalOrderItemsDetail() {
  const orderId = useModalStore((state) => state.orderShowDetailId);
  const { data: orderItems, isLoading, isError } = useQueryOrderItems(orderId);

  if (!orderId || isLoading) return <LoadingState />;

  if (isError) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center">
        <div className="text-base font-semibold text-red-600">
          Không thể tải chi tiết đơn hàng
        </div>
        <p className="mt-2 text-sm text-red-500">Vui lòng thử lại sau.</p>
      </div>
    );
  }

  if (!orderItems || orderItems.length === 0) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center">
        <Package className="h-10 w-10 text-slate-400" />
        <div className="mt-3 text-base font-semibold text-slate-700">
          Đơn hàng chưa có sản phẩm
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Không tìm thấy dữ liệu item trong đơn hàng này.
        </p>
      </div>
    );
  }

  const totalAmount = calculateTotal(orderItems);
  const totalQuantity = orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className="flex flex-col">
      {/* 1. Header Section - Tinh gọn & Hiện đại */}
      <div className="mb-6 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-slate-400">
          <ReceiptText className="h-4 w-4" />
          <span className="text-xs font-semibold tracking-wider uppercase">
            Chi tiết đơn hàng
          </span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold text-slate-900">#{orderId}</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">
                Tổng sản phẩm
              </p>
              <p className="text-sm font-semibold text-slate-700">
                {orderItems.length} mặt hàng
              </p>
            </div>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">
                Số lượng
              </p>
              <p className="text-sm font-semibold text-slate-700">
                {totalQuantity.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. List Section - Danh sách phẳng */}
      <div className="space-y-1 border-t border-slate-100 pt-2">
        {orderItems.map((item) => (
          <OrderItemCard key={item.bookVariantSnapshotId} item={item} />
        ))}
      </div>

      {/* 3. Footer Section - Tổng thanh toán tối giản */}
      <div className="mt-8 rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-200/50">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-slate-600">
              Tổng thanh toán
            </p>
            <p className="text-[11px] text-slate-400">
              Đã bao gồm thuế và phí vận chuyển
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-blue-600 tracking-tight">
              {totalAmount.toLocaleString("vi-VN")}
              <span className="ml-1 text-sm font-bold uppercase">đ</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderItemCard({ item }: { item: OrderItem }) {
  const book = item.bookVariantSnapshot.bookVariant.book;
  const translation = book.translations?.[0];
  const unitPrice = Number(item.bookVariantSnapshot.priceSnapshot);
  const totalPrice = unitPrice * item.quantity;

  return (
    /* Loại bỏ shadow và border dày, dùng border-b để tạo danh sách phẳng */
    <div className="group relative py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors px-2">
      <div className="flex items-center gap-4">
        {/* Thumbnail nhỏ gọn hơn (W-12 thay vì W-20) */}
        <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50">
          <Image
            src={book.coverImageUrl}
            alt={translation?.title || "Book cover"}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>

        {/* Thông tin chính */}
        <div className="flex flex-1 items-center justify-between min-w-0">
          {/* Tên sách & Metadata */}
          <div className="min-w-0 pr-4">
            <h3 className="truncate text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
              {translation?.title || "Không có tiêu đề"}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-700">
                SL: {item.quantity}
              </span>
              <span>•</span>
              <span className="truncate">{translation?.slug || "No-slug"}</span>
            </div>
          </div>

          {/* Giá tiền - Căn lề phải, gọn gàng */}
          <div className="text-right shrink-0">
            <div className="text-sm font-semibold text-slate-900">
              {totalPrice.toLocaleString("vi-VN")} đ
            </div>
            <div className="text-[11px] text-slate-400 italic">
              {unitPrice.toLocaleString("vi-VN")} đ / bản
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const calculateTotal = (items: OrderItem[]) => {
  return items.reduce((sum, item) => {
    const unitPrice = Number(item.bookVariantSnapshot.priceSnapshot);
    return sum + unitPrice * item.quantity;
  }, 0);
};
