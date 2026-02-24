"use client";

import { useTransition } from "react";
import { LOCALE_COOKIE_KEY, type Locale } from "@/lib/i18n/config";
import useTranslator from "@/hooks/use-translator";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const SettingsTranslation = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { t } = useTranslator();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const nextLanguage: Locale = currentLocale === "vi" ? "en" : "vi";

  const handleLanguageChange = () => {
    startTransition(() => {
      const segments = pathname.split("/");

      // If current locale is in URL (e.g. /en/...), replace it
      if (segments[1] === currentLocale) {
        segments[1] = nextLanguage;
      } else {
        // Default locale has no prefix, insert the new locale
        segments.splice(1, 0, nextLanguage);
      }
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
      className={`hidden whitespace-nowrap text-sm hover:opacity-70 md:inline-flex cursor-pointer transition-opacity ${
        isPending ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
      aria-label={t("header.aria.language")}
      onClick={handleLanguageChange}
      disabled={isPending}
    >
      {isPending ? "..." : t("header.languageToggle")}
    </button>
  );
};

export default SettingsTranslation;
