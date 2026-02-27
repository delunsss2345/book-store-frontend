"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ForgotPasswordLink() {
  const t = useTranslations();

  return (
    <div className="flex justify-end mt-2">
      <Link
        href="/forgot-password"
        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
      >
        {t("auth.forgotLink")}
      </Link>
    </div>
  );
}
