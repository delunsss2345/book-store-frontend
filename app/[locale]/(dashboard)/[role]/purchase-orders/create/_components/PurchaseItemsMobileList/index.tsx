"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PurchaseItem } from "@/features/purchaser-orders/store";
import { Trash2 } from "lucide-react";
import { formatCurrency } from "../utils";

export function PurchaseItemsMobileList({
  purchaseItems,
  onItemChange,
  onRemoveItem,
}: {
  purchaseItems: PurchaseItem[];
  onItemChange: (
    id: string,
    field: "quantity" | "unitPrice",
    value: number,
  ) => void;
  onRemoveItem: (id: string) => void;
}) {
  return (
    <div className="md:hidden space-y-3">
      {purchaseItems.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {item.bookVariantName}
              </p>
              <p className="text-xs text-muted-foreground">{item.format}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 text-muted-foreground hover:text-red-500 cursor-pointer"
              onClick={() => onRemoveItem(item.id)}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground font-medium">
                Số lượng
              </Label>
              <Input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  onItemChange(
                    item.id,
                    "quantity",
                    Math.max(1, Number(e.target.value) || 1),
                  )
                }
                className="h-8 text-sm text-center"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground font-medium">
                Đơn giá (₫)
              </Label>
              <Input
                type="number"
                min={0}
                value={item.unitPrice || ""}
                placeholder="0"
                onChange={(e) =>
                  onItemChange(
                    item.id,
                    "unitPrice",
                    Math.max(0, Number(e.target.value) || 0),
                  )
                }
                className="h-8 text-sm text-right"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-dashed">
            <span className="text-xs text-muted-foreground">Thành tiền</span>
            <span className="text-sm font-semibold tabular-nums">
              {formatCurrency(item.quantity * item.unitPrice)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
