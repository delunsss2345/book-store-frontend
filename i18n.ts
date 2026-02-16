import i18next, { type i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import {
  DEFAULT_LOCALE,
  normalizeLocale,
  SUPPORTED_LOCALES,
  type Locale,
} from "./lib/i18n/config";
import enTranslation from "./public/locales/en/translation.json";
import viTranslation from "./public/locales/vi/translation.json";

const resources = {
  vi: {
    translation: viTranslation,
  },
  en: {
    translation: enTranslation,
  },
} as const;

export function createI18nInstance(initialLocale: string = DEFAULT_LOCALE): I18nInstance {
  const locale: Locale = normalizeLocale(initialLocale);
  const instance = i18next.createInstance();

  void instance.use(initReactI18next).init({
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: [...SUPPORTED_LOCALES],
    nonExplicitSupportedLngs: true,
    debug: false,
    initImmediate: false,
    resources,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  return instance;
}
