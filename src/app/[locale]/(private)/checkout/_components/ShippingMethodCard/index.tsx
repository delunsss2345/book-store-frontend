"use client";

import { ShipFee } from "@/src/constants/enums/order";
import { fmt } from "@/utils/format-number-vi";
import { useTranslations } from "next-intl";

export function ShippingMethodCard() {
  const t = useTranslations();

  return (
    <section className="space-y-3">
      <h3 className="text-[17px] font-bold">
        {t("checkout.shippingMethod.title")}
      </h3>

      <div className="flex items-center justify-between rounded-2xl border-2 border-ink bg-surface px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink">
            <span className="h-2.5 w-2.5 rounded-full bg-ink"></span>
          </span>
          <div>
            <p className="text-[14px] font-semibold">
              {t("checkout.shippingMethod.homeDelivery")}
            </p>
            <p className="text-[12px] text-ink-3">
              {t("checkout.shippingMethod.eta")}
            </p>
          </div>
        </div>

        <span className="text-[13px] font-bold text-ok">{fmt(ShipFee)}</span>
      </div>
    </section>
  );
}
