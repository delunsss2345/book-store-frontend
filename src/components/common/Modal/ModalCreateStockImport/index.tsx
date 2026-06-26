"use client";

import { useMemo, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { toast } from "sonner";

import { ModalType, useModalStore } from "@/features/modal";
import { useQueryPurchaserOrderDetail } from "@/features/purchaser-orders/hooks/get-purchaser-orders-detail.mutation";
import { useCreateStockImportMutation } from "@/features/stock-import";
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
import { Textarea } from "@/src/components/ui/textarea";
import LoadingState from "../../LoadingState";

type ModalCreateStockImportProps = {
  onClose: () => void;
};

const formatCurrency = (value?: number | string | null) => {
  const amount = typeof value === "string" ? Number(value) : value;

  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  }).format(Number.isFinite(amount) ? amount ?? 0 : 0);
};

export default function ModalCreateStockImport({
  onClose,
}: ModalCreateStockImportProps) {
  const purchaseOrderId = useModalStore((state) => state.purchaseOrderId);
  const setPurchaseOrderId = useModalStore((state) => state.setPurchaseOrderId);
  const onOpen = useModalStore((state) => state.onOpen);
  const { mutateAsync: createStockImport, isPending } =
    useCreateStockImportMutation();
  const { data: purchaseOrderDetail, isLoading } = useQueryPurchaserOrderDetail(
    purchaseOrderId || undefined,
  );
  const [note, setNote] = useState("");
  const [realQuantities, setRealQuantities] = useState<Record<string, number>>(
    {},
  );
  const stockImportItems = useMemo(
    () =>
      purchaseOrderDetail?.items.map((item) => ({
        purchaseOrderItemId: item.id,
        realQuantity: realQuantities[item.id] ?? item.quantity,
      })) ?? [],
    [purchaseOrderDetail?.items, realQuantities],
  );

  const totalRealQuantity = useMemo(
    () => stockImportItems.reduce((sum, item) => sum + item.realQuantity, 0),
    [stockImportItems],
  );

  const updateRealQuantity = (purchaseOrderItemId: string, value: number) => {
    setRealQuantities((items) => ({
      ...items,
      [purchaseOrderItemId]: Math.max(0, Number.isFinite(value) ? value : 0),
    }));
  };

  const submit = async () => {
    if (!purchaseOrderId || stockImportItems.length === 0) return;

    await toast.promise(
      createStockImport({
        purchaseOrderId,
        note: note.trim(),
        items: stockImportItems,
      }),
      {
        loading: "Đang tạo phiếu nhập kho...",
        success: "Tạo phiếu nhập kho thành công",
        error: "Tạo phiếu nhập kho thất bại",
      },
    );

    onClose();
  };

  if (isLoading || !purchaseOrderId || !purchaseOrderDetail) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 pr-8">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <ClipboardCheck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Kiểm tra đơn hàng
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Mã đơn: <span className="font-mono">#{purchaseOrderId}</span>
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Ghi chú</label>
        <Textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Nhập ghi chú nhập kho..."
          className="min-h-20"
        />
      </div>

      <div className="rounded-lg border border-line">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Sản phẩm</TableHead>
              <TableHead className="text-right">SL đặt</TableHead>
              <TableHead className="text-right">Giá</TableHead>
              <TableHead className="text-right">Đơn giá</TableHead>
              <TableHead className="text-right">Giảm giá</TableHead>
              <TableHead className="text-right">SL thực nhận</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrderDetail.items.map((item) => {
              const realQuantity = realQuantities[item.id] ?? item.quantity;

              return (
                <TableRow key={item.id}>
                  <TableCell className="min-w-[220px]">
                    <div className="font-medium text-foreground">
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.format}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.price ?? item.totalPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.unitPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.discountPrice ?? 0)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      min={0}
                      value={realQuantity}
                      onChange={(event) =>
                        updateRealQuantity(item.id, Number(event.target.value))
                      }
                      className="ml-auto h-8 w-28 text-right"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          Tổng số lượng thực nhận:{" "}
          <span className="font-semibold text-foreground">
            {totalRealQuantity}
          </span>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setPurchaseOrderId(purchaseOrderId);
              onOpen(ModalType.DETAIL_PURCHASE_ORDER);
            }}
          >
            Xem chi tiết
          </Button>
          <Button type="button" variant="ghost" onClick={onClose}>
            Hủy
          </Button>
          <Button type="button" disabled={isPending} onClick={submit}>
            {isPending ? "Đang tạo..." : "Tạo phiếu nhập"}
          </Button>
        </div>
      </div>
    </div>
  );
}
