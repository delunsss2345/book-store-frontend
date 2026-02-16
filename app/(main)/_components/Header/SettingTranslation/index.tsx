"use client";

import { LOCALE_COOKIE_KEY, normalizeLocale, type Locale } from "@/lib/i18n/config";
import useTranslator from "@/hooks/use-translator";
import { useRouter } from "next/navigation";

const SettingsTranslation = () => {
  const router = useRouter();
  const { t, i18n } = useTranslator();
  const activeLanguage = normalizeLocale(i18n.resolvedLanguage ?? i18n.language);
  const nextLanguage: Locale = activeLanguage === "vi" ? "en" : "vi";

  const handleLanguageChange = async () => {
    await i18n.changeLanguage(nextLanguage);

    try {
      localStorage.setItem(LOCALE_COOKIE_KEY, nextLanguage);
    } catch {
      // noop: localStorage may be blocked in private browsing modes.
    }

    document.cookie = `${LOCALE_COOKIE_KEY}=${nextLanguage}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  return (
    <button
      type="button"
      className="hidden whitespace-nowrap text-sm hover:opacity-70 md:inline-flex cursor-pointer"
      aria-label={t("header.aria.language")}
      onClick={handleLanguageChange}
    >
      {t("header.languageToggle")}
    </button>
  );
};

export default SettingsTranslation;
