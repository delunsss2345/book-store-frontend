"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type PaymentMethodRadioProps = {
  defaultValue?: "sepay" | "cod";
  onValueChange?: (value: "sepay" | "cod") => void;
  variant?: "compact" | "rich";
};

export function PaymentMethodRadio({
  defaultValue = "sepay",
  onValueChange,
  variant = "compact",
}: PaymentMethodRadioProps) {
  const containerClass =
    variant === "rich"
      ? "gap-0 rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm"
      : "gap-0 overflow-hidden rounded-xl border border-zinc-200 shadow-sm bg-white";

  const itemClass =
    variant === "rich"
      ? "flex cursor-pointer items-center gap-4 p-5 transition-colors hover:bg-zinc-50"
      : "flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-zinc-50";

  return (
    <RadioGroup
      defaultValue={defaultValue}
      onValueChange={(v) => onValueChange?.(v as "sepay" | "cod")}
      className={containerClass}
    >
      <label htmlFor="sepay" className={`${itemClass} border-b`}>
        <RadioGroupItem value="sepay" id="sepay" />
        <div className="flex-1">
          <p className="text-sm font-bold text-zinc-900">
            {variant === "rich" ? "sepay" : "Thanh toán qua sepay"}
          </p>
          <p className="text-xs text-zinc-500">
            {variant === "rich"
              ? "Thanh toán an toàn qua cổng sepay"
              : "Thẻ nội địa, Visa, Mastercard, JCB, QR Code"}
          </p>
        </div>

        {variant === "rich" ? (
          <div className="flex gap-1">
            <div className="rounded border border-zinc-200 bg-zinc-100 px-2 py-1 text-[9px] font-black text-zinc-400">
              VISA
            </div>
            <div className="rounded border border-zinc-200 bg-zinc-100 px-2 py-1 text-[9px] font-black text-zinc-400">
              MASTERCARD
            </div>
          </div>
        ) : (
          <div className="ml-auto flex items-center gap-1">
            <div className="flex h-5 w-8 items-center justify-center rounded bg-blue-600 text-[8px] font-bold uppercase italic text-white">
              Visa
            </div>
            <div className="flex h-5 w-8 items-center justify-center rounded bg-red-500 text-[8px] font-bold uppercase italic text-white">
              MC
            </div>
          </div>
        )}
      </label>

      <label htmlFor="cod" className={itemClass}>
        <RadioGroupItem value="cod" id="cod" />
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-bold text-zinc-900">
            Thanh toán khi nhận hàng (COD)
          </p>
          <p className="text-xs text-zinc-500">
            {variant === "rich"
              ? "Kiểm tra hàng trước khi thanh toán"
              : "Bạn sẽ thanh toán bằng tiền mặt khi shipper giao hàng"}
          </p>
        </div>
      </label>
    </RadioGroup>
  );
}
