"use client";

import { useOrderStore } from "@/features/orders";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { PaymentGateway } from "@/validation/order-address/orderAddressValidation";
import { useTranslations } from "next-intl";

export function PaymentMethodRadio() {
  const t = useTranslations();
  const gateway = useOrderStore((s) => s.paymentGateway);
  const setPaymentGateway = useOrderStore((s) => s.setPaymentGateway);

  return (
    <RadioGroup
      value={gateway}
      onValueChange={(v) => setPaymentGateway(v as PaymentGateway)}
      className="grid gap-3 sm:grid-cols-2"
    >
      {/* SEPAY */}
      <label
        htmlFor={PaymentGateway.SEPAY}
        className={`flex cursor-pointer items-start gap-3 rounded-2xl bg-surface p-5 transition-colors ${
          gateway === PaymentGateway.SEPAY
            ? "border-2 border-ink"
            : "border border-line hover:border-ink/40"
        }`}
      >
        <RadioGroupItem
          value={PaymentGateway.SEPAY}
          id={PaymentGateway.SEPAY}
          className="sr-only"
        />
        <span
          className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
            gateway === PaymentGateway.SEPAY ? "border-ink" : "border-line"
          }`}
        >
          {gateway === PaymentGateway.SEPAY && (
            <span className="h-2.5 w-2.5 rounded-full bg-ink"></span>
          )}
        </span>
        <div>
          <p className="text-[14px] font-semibold">sepay</p>
          <p className="mt-0.5 text-[12px] text-ink-3">
            Domestic cards, Visa, Mastercard, JCB, QR Code
          </p>
        </div>
      </label>

      {/* COD */}
      <label
        htmlFor={PaymentGateway.COD}
        className={`flex cursor-pointer items-start gap-3 rounded-2xl bg-surface p-5 transition-colors ${
          gateway === PaymentGateway.COD
            ? "border-2 border-ink"
            : "border border-line hover:border-ink/40"
        }`}
      >
        <RadioGroupItem
          value={PaymentGateway.COD}
          id={PaymentGateway.COD}
          className="sr-only"
        />
        <span
          className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
            gateway === PaymentGateway.COD ? "border-ink" : "border-line"
          }`}
        >
          {gateway === PaymentGateway.COD && (
            <span className="h-2.5 w-2.5 rounded-full bg-ink"></span>
          )}
        </span>
        <div>
          <p className="text-[14px] font-semibold">
            {t("checkout.paymentMethod.codTitle")}
          </p>
          <p className="mt-0.5 text-[12px] text-ink-3">
            You will pay cash when the shipper delivers
          </p>
        </div>
      </label>
    </RadioGroup>
  );
}
