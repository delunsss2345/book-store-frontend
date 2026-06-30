"use client";

import { OrderStatus } from "@/constants/enums/order";
import { Badge } from "@/src/components/ui/badge";
import { OrderSummary } from "@/src/types/response/order.response";
import { ChevronRight } from "lucide-react";
import { ModalType, useModalStore } from "@/features/modal";
import { useTranslations } from "next-intl";

type OrderCardProps = {
  order: OrderSummary;
  onClick: () => void;
};

const ORDER_STATUS_STYLES: Record<
  OrderStatus,
  { label: string; tone: string; dot: string }
> = {
  [OrderStatus.PENDING_PAYMENT]: {
    label: "Pending payment",
    tone: "bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
  },
  [OrderStatus.PAID]: {
    label: "Paid",
    tone: "bg-blue-50 text-blue-700",
    dot: "bg-blue-500",
  },
  [OrderStatus.CONFIRMED]: {
    label: "Confirmed",
    tone: "bg-sky-50 text-sky-700",
    dot: "bg-sky-500",
  },
  [OrderStatus.PACKING]: {
    label: "Packing",
    tone: "bg-slate-50 text-slate-700",
    dot: "bg-slate-500",
  },
  [OrderStatus.SHIPPING]: {
    label: "Shipping",
    tone: "bg-sky-50 text-sky-700",
    dot: "bg-sky-500",
  },
  [OrderStatus.DELIVERED]: {
    label: "Delivered",
    tone: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
  [OrderStatus.CANCELLED]: {
    label: "Cancelled",
    tone: "bg-red-50 text-red-700",
    dot: "bg-red-500",
  },
  [OrderStatus.RETURN_REQUESTED]: {
    label: "Return requested",
    tone: "bg-purple-50 text-purple-700",
    dot: "bg-purple-500",
  },
  [OrderStatus.RETURNED]: {
    label: "Returned",
    tone: "bg-purple-50 text-purple-700",
    dot: "bg-purple-500",
  },
  [OrderStatus.REFUNDED]: {
    label: "Refunded",
    tone: "bg-purple-50 text-purple-700",
    dot: "bg-purple-500",
  },
};

const formatDate = (value: string | null | undefined) => {
  if (!value) return "N/A";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const formatCurrency = (
  value: string | number | null | undefined,
  currency: string,
) => {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "VND" ? 0 : 2,
  }).format(amount);
};



export function OrderCard({ order, onClick }: OrderCardProps) {
  const t = useTranslations();
  const currency = order.currencyCode ?? "VND";
  const statusKey = order.status ?? OrderStatus.PENDING_PAYMENT;
  const status = ORDER_STATUS_STYLES[statusKey];
  const placedAt = order.createdAt;
  const total = Number(order.totalAmount ?? order.subtotal ?? 0);
  const { setOrderShowDetailId, onOpen } = useModalStore();

  const handleViewPaymentHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOrderShowDetailId(order.id);
    onOpen(ModalType.ORDER_PAYMENT_HISTORY);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-neutral-100 bg-neutral-50/60 px-6 py-4">
        <div className="flex flex-wrap gap-x-10 gap-y-1 text-sm text-neutral-500">
          <div>
            <p className="text-xs text-neutral-400">Order placed</p>
            <p className="font-medium text-neutral-900">
              {formatDate(placedAt)}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Order number</p>
            <p className="font-medium text-neutral-900">{order.orderCode}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Total</p>
            <p className="font-medium text-neutral-900">
              {formatCurrency(total, currency)}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`gap-1.5 rounded-full border-0 px-3 py-1 text-xs font-medium ${status.tone}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 text-sm text-neutral-500">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-400">
            Subtotal
          </p>
          <p className="font-medium text-neutral-900">
            {formatCurrency(order.subtotal, currency)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-400">
            Shipping
          </p>
          <p className="font-medium text-neutral-900">
            {formatCurrency(order.shippingFee, currency)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-400">
            Discount
          </p>
          <p className="font-medium text-neutral-900">
            {formatCurrency(order.discountAmount, currency)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-3 text-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onClick}
            className="cursor-pointer flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            {t("orders.viewDetails")} <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleViewPaymentHistory}
            className="cursor-pointer flex items-center gap-1 text-sm font-medium text-amber-600 hover:underline"
          >
            {t("orders.paymentHistory")}
          </button>
        </div>
      </div>
    </div>
  );
}
