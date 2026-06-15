"use client";

import { Input } from "@/components/ui/input";
import { formatCurrency } from "../utils";

export function OrderSummaryBar({
  itemTypeCount,
  totalQty,
  taxPercent,
  setTaxPercent,
  subtotal,
  taxAmount,
  grandTotal,
}: {
  itemTypeCount: number;
  totalQty: number;
  taxPercent: number;
  setTaxPercent: (v: number) => void;
  subtotal: number;
  taxAmount: number;
  grandTotal: number;
}) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-4 md:p-5">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Tổng sản phẩm</span>
            <p className="font-semibold text-foreground">
              {itemTypeCount} loại · {totalQty} items
            </p>
          </div>

          <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Thuế (%)</span>
            <Input
              type="number"
              min={0}
              max={100}
              value={taxPercent || ""}
              placeholder="0"
              onChange={(e) =>
                setTaxPercent(
                  Math.min(100, Math.max(0, Number(e.target.value) || 0)),
                )
              }
              className="h-8 w-20 text-sm text-center"
            />
          </div>

          <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Tạm tính</span>
            <p className="font-medium tabular-nums text-foreground">
              {formatCurrency(subtotal)}
            </p>
          </div>

          {taxPercent > 0 && (
            <>
              <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Thuế</span>
                <p className="font-medium tabular-nums text-foreground">
                  {formatCurrency(taxAmount)}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="text-right space-y-0.5">
          <span className="text-xs text-muted-foreground">
            Tổng tiền thanh toán
          </span>
          <p className="text-2xl md:text-3xl font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
            {formatCurrency(grandTotal)}
          </p>
        </div>
      </div>
    </div>
  );
}
