"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useApprovePurchaseOrderMutation,
} from "@/features/purchaser-orders/hooks/create-purchaser-orders.mutation";
import { ModalType, useModalStore } from "@/features/modal";
import { PurchaseOrderStatus } from "@/types/request/purchase-order.request";
import type { PurchaseOrderItem } from "@/types/response/purchase-order.response";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Package } from "lucide-react";
import { useMemo } from "react";
import { formatCurrency, formatDate } from "./utils";

export function usePurchaseOrderColumns() {
  const { setPurchaseOrderId, onOpen } = useModalStore();
  const { mutate: approvePurchaseOrder } = useApprovePurchaseOrderMutation();

  return useMemo<ColumnDef<PurchaseOrderItem>[]>(
    () => [
      {
        accessorKey: "code",
        header: () => "Mã đơn",
        cell: ({ row }) => (
          <span className="font-mono text-sm font-semibold text-foreground">
            {row.original.code}
          </span>
        ),
      },
      {
        id: "supplierName",
        header: () => "Nhà cung cấp",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <Package className="size-3.5 text-muted-foreground" />
            </div>
            <span className="font-medium text-foreground">
              {row.original.supplier?.name || "N/A"}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: () => "Ngày tạo",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatDate(row.original.createdAt)}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: () => "Trạng thái",
        cell: ({ row }) => (
          <Badge variant="outline" className="gap-1.5 font-medium">
            <span className="h-1.5 w-1.5 rounded-full" />
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "totalAmount",
        header: () => <div className="text-right">Tổng giá</div>,
        cell: ({ row }) => (
          <div className="text-right font-semibold tabular-nums text-foreground">
            {formatCurrency(row.original.totalAmount)}
          </div>
        ),
      },
      {
        id: "actions",
        header: () => <div className="text-right">Thao tác</div>,
        cell: ({ row }) => {
          const request = row.original;
          return (
            <div className="flex items-center justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setPurchaseOrderId(request.id);
                      onOpen(ModalType.DETAIL_PURCHASE_ORDER);
                    }}
                  >
                    Xem chi tiết
                  </DropdownMenuItem>
                  {request.status === "PENDING" && (
                    <>
                      <DropdownMenuItem
                        onClick={() =>
                          approvePurchaseOrder({
                            purchaseOrderId: request.id,
                            data: { status: PurchaseOrderStatus.APPROVED },
                          })
                        }
                      >
                        Chấp nhận đơn
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          approvePurchaseOrder({
                            purchaseOrderId: request.id,
                            data: { status: PurchaseOrderStatus.REJECTED },
                          })
                        }
                      >
                        Từ chối đơn
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [approvePurchaseOrder, onOpen, setPurchaseOrderId],
  );
}
