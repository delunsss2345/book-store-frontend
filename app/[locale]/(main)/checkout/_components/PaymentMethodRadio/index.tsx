"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOrderStore } from "@/features/orders";
import { PaymentGateway } from "@/validation/order-address/orderAddressValidation";
import { Banknote, Landmark } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  variant?: "rich" | "compact";
};

export function PaymentMethodRadio({ variant = "rich" }: Props) {
  const t = useTranslations();
  const gateway = useOrderStore((s) => s.paymentGateway);
  const setPaymentGateway = useOrderStore((s) => s.setPaymentGateway);

  const itemClass =
    variant === "rich"
      ? "flex cursor-pointer items-center gap-4 p-5 hover:bg-zinc-50"
      : "flex cursor-pointer items-center gap-4 p-4 hover:bg-zinc-50";

  const iconSize = variant === "rich" ? 20 : 18;

  return (
    <RadioGroup
      value={gateway}
      onValueChange={(v) => setPaymentGateway(v as PaymentGateway)}
      className="gap-0 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
    >
      {/* SEPAY - MB Bank style */}
      <label
        htmlFor={PaymentGateway.SEPAY}
        className={`${itemClass} border-b`}
      >
        <RadioGroupItem
          value={PaymentGateway.SEPAY}
          id={PaymentGateway.SEPAY}
        />

        <div className="flex items-center gap-3 flex-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#005BAC] text-white">
            <Landmark size={iconSize} strokeWidth={2} />
          </div>

          <p className="text-sm font-bold text-zinc-900">
            {variant === "rich"
              ? t("checkout.paymentMethod.sepayRichTitle")
              : t("checkout.paymentMethod.sepayCompactTitle")}
          </p>
        </div>
      </label>

      {/* COD */}
      <label htmlFor={PaymentGateway.COD} className={itemClass}>
        <RadioGroupItem
          value={PaymentGateway.COD}
          id={PaymentGateway.COD}
        />

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-100 text-zinc-700">
            <Banknote size={iconSize} strokeWidth={2} />
          </div>

          <p className="text-sm font-bold text-zinc-900">
            {t("checkout.paymentMethod.codTitle")}
          </p>
        </div>
      </label>
    </RadioGroup>
  );
}