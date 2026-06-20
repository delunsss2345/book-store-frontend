"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

type CheckoutHeaderProps = {
  title: string;
  backHref?: string;
  backText?: string;
  right?: React.ReactNode;
};

export function CheckoutHeader({
  title,
  backHref = "/cart",
  backText,
  right,
}: CheckoutHeaderProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  return (
    <div>
      <button
        onClick={() => router.push(`/${locale}${backHref}`)}
        className="mb-4 flex items-center text-[13px] text-ink-3 transition hover:text-ink"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        {backText ?? t("checkout.backToCart")}
      </button>

      <div className="flex items-baseline justify-between gap-4">
        <h2 className="display text-[30px] font-semibold tracking-tight text-ink">
          {title}
        </h2>
        {right}
      </div>
    </div>
  );
}
