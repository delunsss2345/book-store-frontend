"use client";

import { PurchaseItem } from "@/features/purchaser-orders/store";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Trash2 } from "lucide-react";
import { formatCurrency } from "../utils";

export function PurchaseItemsTable({
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
    <div className="hidden md:block rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50 dark:bg-slate-900/30">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-10 w-[40%]">
              Sản phẩm
            </TableHead>
            <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-10 w-[15%] text-center">
              Định dạng
            </TableHead>
            <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-10 w-[15%] text-center">
              Số lượng
            </TableHead>
            <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-10 w-[20%] text-right">
              Đơn giá nhập (₫)
            </TableHead>
            <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-10 w-[18%] text-right">
              Thành tiền
            </TableHead>
            <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-10 w-[7%] text-center">
              Xóa
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {purchaseItems.map((item, idx) => (
            <TableRow
              key={item.id}
              className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
            >
              <TableCell className="py-3">
                <p className="text-sm font-medium text-foreground">
                  {item.bookVariantName}
                </p>
              </TableCell>

              <TableCell className="py-3">
                <p className="text-sm font-medium text-foreground text-center">
                  {item.format}
                </p>
              </TableCell>

              <TableCell className="py-3">
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
                  className="h-8 w-20 mx-auto text-center text-sm tabular-nums"
                  tabIndex={idx * 2 + 1}
                />
              </TableCell>

              <TableCell className="py-3">
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
                  className="h-8 w-32 ml-auto text-right text-sm tabular-nums"
                  tabIndex={idx * 2 + 2}
                />
              </TableCell>

              <TableCell className="py-3 text-right">
                <span className="text-sm font-semibold tabular-nums text-foreground">
                  {formatCurrency(item.quantity * item.unitPrice)}
                </span>
              </TableCell>

              <TableCell className="py-3 text-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-red-500 cursor-pointer"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
