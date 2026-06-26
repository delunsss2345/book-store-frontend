"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CheckCheck, PackageCheck } from "lucide-react";

import { useModalStore } from "@/features/modal";
import {
  PurchaseItem,
  usePurchaseStore,
} from "@/features/purchaser-orders/store";

type ModalPurchaseOrderConfirmProps = {
  onClose: () => void;
};

type DraftPurchaseItem = PurchaseItem & {
  discountPrice: number;
};

export default function ModalPurchaseOrderConfirm({
  onClose,
}: ModalPurchaseOrderConfirmProps) {
  const purchaseItems = usePurchaseStore((state) => state.purchaseItems);
  const updateItem = usePurchaseStore((state) => state.updateItem);
  const onConfirm = useModalStore((state) => state.purchaseOrderConfirmSubmit);
  const [draftItems, setDraftItems] = useState<DraftPurchaseItem[]>(
    purchaseItems.map((item) => ({
      ...item,
      discountPrice: item.discountPrice ?? item.discount ?? 0,
    })),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getLineTotal = (item: DraftPurchaseItem) => {
    const discountPercent = Math.min(100, Math.max(0, item.discountPrice));
    return Math.round(
      item.quantity * item.unitPrice * (1 - discountPercent / 100),
    );
  };

  const total = useMemo(
    () => draftItems.reduce((sum, item) => sum + getLineTotal(item), 0),
    [draftItems],
  );

  const updateDraft = (
    id: string,
    field: "quantity" | "unitPrice" | "discountPrice",
    value: number,
  ) => {
    setDraftItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const submit = async () => {
    if (!onConfirm || draftItems.length === 0) return;

    setIsSubmitting(true);
    draftItems.forEach((item) => {
      updateItem(item.id, "quantity", item.quantity);
      updateItem(item.id, "unitPrice", item.unitPrice);
      updateItem(item.id, "discount", item.discountPrice);
      updateItem(item.id, "discountPrice", item.discountPrice);
      updateItem(item.id, "totalPrice", getLineTotal(item));
    });

    try {
      await toast.promise(Promise.resolve(onConfirm(draftItems)), {
        loading: "Đang tạo đơn nhập hàng...",
        success: "Tạo đơn nhập hàng thành công",
        error: "Tạo đơn nhập hàng thất bại",
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 pr-8">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <PackageCheck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="display text-xl font-semibold text-ink">
            Xác nhận gửi nhà cung cấp
          </h2>
          <p className="mt-1 text-[13px] text-ink-3">
            Kiểm tra lại số lượng và đơn giá nhập trước khi tạo đơn.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="tbl w-full">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Định dạng</th>
              <th>Số lượng gửi</th>
              <th>Đơn giá gửi NCC</th>
              <th>Chiết khấu (%)</th>
              <th className="text-right">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {draftItems.map((item) => (
              <tr key={item.id}>
                <td className="max-w-[260px] truncate font-semibold text-ink">
                  {item.bookVariantName}
                </td>
                <td>{item.format}</td>
                <td>
                  <input
                    className="field h-8 w-24 px-2 text-right"
                    min={1}
                    type="number"
                    value={item.quantity}
                    onChange={(event) =>
                      updateDraft(
                        item.id,
                        "quantity",
                        Math.max(1, Number(event.target.value) || 1),
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    className="field h-8 w-32 px-2 text-right"
                    min={0}
                    type="number"
                    value={item.unitPrice}
                    onChange={(event) =>
                      updateDraft(
                        item.id,
                        "unitPrice",
                        Math.max(0, Number(event.target.value) || 0),
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    className="field h-8 w-28 px-2 text-right"
                    max={100}
                    min={0}
                    type="number"
                    value={item.discountPrice}
                    onChange={(event) =>
                      updateDraft(
                        item.id,
                        "discountPrice",
                        Math.min(
                          100,
                          Math.max(0, Number(event.target.value) || 0),
                        ),
                      )
                    }
                  />
                </td>
                <td className="text-right font-semibold text-ink">
                  {getLineTotal(item).toLocaleString()} ₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[12px] uppercase text-ink-3">
            Tổng gửi nhà cung cấp
          </p>
          <p className="display text-2xl font-semibold text-accent">
            {total.toLocaleString()} ₫
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="btn-soft rounded-lg px-4 py-2 text-[13px]"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="btn-ink rounded-lg px-4 py-2 text-[13px]"
            disabled={isSubmitting}
            onClick={submit}
          >
            <CheckCheck className="h-4 w-4" />
            Tạo đơn
          </button>
        </div>
      </div>
    </div>
  );
}
