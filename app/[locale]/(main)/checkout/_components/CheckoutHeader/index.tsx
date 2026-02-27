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
        className="mb-4 flex items-center text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        {backText ?? t("checkout.backToCart")}
      </button>

      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">
          {title}
        </h2>
        {right}
      </div>
    </div>
  );
}
