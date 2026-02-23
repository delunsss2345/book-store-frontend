"use client";

import { useTransition } from "react"; // 1. Import useTransition
import {
  LOCALE_COOKIE_KEY,
  normalizeLocale,
  type Locale,
} from "@/lib/i18n/config";
import useTranslator from "@/hooks/use-translator";
import { usePathname, useRouter } from "next/navigation";

const SettingsTranslation = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { t, i18n } = useTranslator();
  const pathname = usePathname();
  const activeLanguage = normalizeLocale(
    i18n.resolvedLanguage ?? i18n.language,
  );

  const nextLanguage: Locale = activeLanguage === "vi" ? "en" : "vi";

  const handleLanguageChange = () => {
    startTransition(async () => {
      await i18n.changeLanguage(nextLanguage);
      const segments = pathname.split("/");
      segments[1] = nextLanguage;
      const nextPathname = segments.join("/");

      try {
        localStorage.setItem(LOCALE_COOKIE_KEY, nextLanguage);
      } catch (e) {}

      document.cookie = `${LOCALE_COOKIE_KEY}=${nextLanguage}; path=/; max-age=31536000; samesite=lax`;

      router.replace(nextPathname);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      // 4. Thêm hiệu ứng visual khi đang chuyển đổi (tùy chọn)
      className={`hidden whitespace-nowrap text-sm hover:opacity-70 md:inline-flex cursor-pointer transition-opacity ${
        isPending ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
      aria-label={t("header.aria.language")}
      onClick={handleLanguageChange}
      disabled={isPending}
    >
      {/* Hiển thị text hoặc icon tương ứng */}
      {isPending ? "..." : t("header.languageToggle")}
    </button>
  );
};

export default SettingsTranslation;
