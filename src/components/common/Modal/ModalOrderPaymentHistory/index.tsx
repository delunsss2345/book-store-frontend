"use client";

import { useModalStore } from "@/features/modal";
import { useQueryPaymentHistory } from "@/features/hooks/hooks/use-get-payment-history";
import LoadingState from "../../LoadingState";
import { History, Calendar, CreditCard } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";

export default function ModalOrderPaymentHistory() {
  const orderIdStr = useModalStore((state) => state.orderShowDetailId);
  const orderId = orderIdStr ? parseInt(orderIdStr, 10) : 0;

  const { data: paymentHistory, isLoading, isError } = useQueryPaymentHistory(orderId, {
    enabled: !!orderId,
  });

  if (!orderId || isLoading) return <LoadingState />;

  if (isError) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center">
        <div className="text-base font-semibold text-red-600">
          Không thể tải lịch sử thanh toán
        </div>
        <p className="mt-2 text-sm text-red-500">Vui lòng thử lại sau.</p>
      </div>
    );
  }

  if (!paymentHistory || paymentHistory.length === 0) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center">
        <History className="h-10 w-10 text-slate-400" />
        <div className="mt-3 text-base font-semibold text-slate-700">
          Chưa có giao dịch nào
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Không tìm thấy giao dịch thanh toán nào được ghi nhận cho đơn hàng này.
        </p>
      </div>
    );
  }

  const formatCurrency = (amount: string, currency: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currency || "VND",
      maximumFractionDigits: (currency || "VND") === "VND" ? 0 : 2,
    }).format(Number(amount));
  };

  const formatDate = (dateStr: string | Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(dateStr));
  };

  const getStatusBadge = (status: string | null) => {
    const s = status?.toUpperCase();
    if (s === "SUCCESS" || s === "PAID") {
      return (
        <Badge className="bg-emerald-50 text-emerald-700 border-0 rounded-full hover:bg-emerald-50">
          Thành công
        </Badge>
      );
    }
    if (s === "PENDING") {
      return (
        <Badge className="bg-amber-50 text-amber-700 border-0 rounded-full hover:bg-amber-50">
          Chờ xử lý
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-50 text-red-700 border-0 rounded-full hover:bg-red-50">
        {status || "Thất bại"}
      </Badge>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-slate-400">
          <History className="h-4 w-4" />
          <span className="text-xs font-semibold tracking-wider uppercase">
            Lịch sử thanh toán
          </span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold text-slate-900">Đơn hàng #{orderId}</h2>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">
              Tổng số giao dịch
            </p>
            <p className="text-sm font-semibold text-slate-700">
              {paymentHistory.length} giao dịch
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-slate-100 pt-4">
        {paymentHistory.map((tx) => (
          <div
            key={tx.id}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <CreditCard className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    Mã GD: #{tx.id}
                  </span>
                  <Badge variant="outline" className="text-[10px] py-0 px-2 font-mono">
                    {tx.gateway}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(tx.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="text-left sm:text-right">
                <span className="text-base font-black text-slate-900">
                  {formatCurrency(tx.amount, tx.currencyCode)}
                </span>
              </div>
              <div>{getStatusBadge(tx.status)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
