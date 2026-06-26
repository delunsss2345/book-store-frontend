export const SUPPORTED_LOCALES = ["vi", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "vi";
export const LOCALE_COOKIE_KEY = "appLanguage";

const LEGACY_LOCALE_MAP: Record<string, Locale> = {
  vn: "vi",
};

export function normalizeLocale(input?: string | null): Locale {
  if (!input) {
    return DEFAULT_LOCALE;
  }

  const normalizedInput = input.toLowerCase();
  const shortLocale = normalizedInput.split("-")[0];
  const mappedLocale = LEGACY_LOCALE_MAP[shortLocale] ?? shortLocale;

  return (SUPPORTED_LOCALES as readonly string[]).includes(mappedLocale)
    ? (mappedLocale as Locale)
    : DEFAULT_LOCALE;
}
