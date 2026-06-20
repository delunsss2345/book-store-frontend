"use client";

import { useTransition } from "react";
import { LOCALE_COOKIE_KEY, type Locale } from "@/lib/i18n/config";
import useTranslator from "@/hooks/use-translator";
import { Globe } from "lucide-react";
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

      if (segments[1] === currentLocale) {
        segments[1] = nextLanguage;
      } else {
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
      className={`inline-flex h-9 items-center gap-1 rounded-full px-2.5 text-[12px] font-medium text-ink transition hover:bg-paper ${
        isPending ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
      aria-label={t("header.aria.language")}
      onClick={handleLanguageChange}
      disabled={isPending}
    >
      <Globe className="h-[18px] w-[18px]" />
      <span className="hidden lg:inline">{currentLocale.toUpperCase()}/{nextLanguage.toUpperCase()}</span>
    </button>
  );
};

export default SettingsTranslation;
