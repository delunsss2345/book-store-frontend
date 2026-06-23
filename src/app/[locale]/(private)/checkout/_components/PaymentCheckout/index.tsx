"use client";

import { useTranslations } from "next-intl";
import { PaymentMethodRadio } from "../PaymentMethodRadio";

export function PaymentCheckout() {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <PaymentMethodRadio />
    </div>
  );
}
