"use client";

import { Button } from "@/src/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

type CheckoutFooterProps = {
  buttonText: string;
  secureText?: string;
  buttonClassName?: string;
  disabled?: boolean;
};

export function CheckoutFooter({
  buttonText,
  secureText,
  buttonClassName,
  disabled,
}: CheckoutFooterProps) {
  const t = useTranslations();

  return (
    <div>
      <button
        type="submit"
        disabled={disabled}
        className={
          buttonClassName ??
          "btn-ink h-16 w-full rounded-2xl text-[17px] shadow-xl shadow-line-2/50"
        }
      >
        {buttonText}
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-ink-3">
        <ShieldCheck className="h-4 w-4" />
        {secureText ?? t("checkout.secureText")}
      </p>
    </div>
  );
}
