"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useModalStore } from "@/features/modal";
import { AdminOrderStatus } from "@/types/response/admin.response";
import { useUpdateOrderStatusMutation } from "@/features/admin";

type OrderActionType = AdminOrderStatus.CONFIRMED | AdminOrderStatus.CANCELLED;

const actionConfig: Record<
  OrderActionType,
  {
    title: string;
    description: string;
    buttonText: string;
    status: AdminOrderStatus.CONFIRMED | AdminOrderStatus.CANCELLED;
    icon: React.ReactNode;
    buttonClass: string;
    iconWrapperClass: string;
  }
> = {
  [AdminOrderStatus.CONFIRMED]: {
    title: "Chấp nhận đơn hàng",
    description: "Bạn có chắc muốn chấp nhận đơn hàng này không?",
    buttonText: "Chấp nhận",
    status: AdminOrderStatus.CONFIRMED,
    icon: <CheckCircle2 className="size-6 text-green-600" />,
    buttonClass: "bg-green-600 hover:bg-green-700 text-white",
    iconWrapperClass: "bg-green-50 border-green-100",
  },
  [AdminOrderStatus.CANCELLED]: {
    title: "Từ chối đơn hàng",
    description: "Bạn có chắc muốn từ chối đơn hàng này không?",
    buttonText: "Từ chối",
    status: AdminOrderStatus.CANCELLED,
    icon: <XCircle className="size-6 text-red-600" />,
    buttonClass: "bg-red-600 hover:bg-red-700 text-white",
    iconWrapperClass: "bg-red-50 border-red-100",
  },
};

export default function ModalApproveOrderAdmin() {
  const [note, setNote] = useState("");

  const action = useModalStore((state) => state.actionApproveOrder);
  const onClose = useModalStore((state) => state.onClose);
  const { mutateAsync: updateOrderStatus } = useUpdateOrderStatusMutation();
  const current =
    actionConfig[
      (action?.status as OrderActionType) ?? AdminOrderStatus.CANCELLED
    ];

  const handleSubmit = async () => {
    if (!action?.orderId) return;
    try {
      await updateOrderStatus({
        orderId: action.orderId,
        status: current.status,
        note,
      });

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center text-center space-y-5">
        <div
          className={`flex size-14 items-center justify-center rounded-full border ${current.iconWrapperClass}`}
        >
          {current.icon}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground">{current.title}</h3>

          <p className="text-sm text-muted-foreground">
            Đơn hàng:{" "}
            <span className="font-semibold text-foreground">
              #{action?.orderId}
            </span>
          </p>

          <p className="text-sm leading-6 text-muted-foreground max-w-sm">
            {current.description}
          </p>
        </div>

        <div className="w-full space-y-2 text-left">
          <label htmlFor="note" className="text-sm font-medium">
            Ghi chú
            <span className="ml-1 text-xs text-muted-foreground">
              (không bắt buộc)
            </span>
          </label>

          <textarea
            id="note"
            rows={5}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Nhập lý do hoặc ghi chú nếu cần..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-950"
          />
        </div>

        <div className="flex w-full justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-w-28 rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className={`min-w-28 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${current.buttonClass}`}
          >
            {current.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
