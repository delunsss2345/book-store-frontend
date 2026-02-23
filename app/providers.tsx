"use client";

import { useAuthStore } from "@/features/auth";
import { useGetMeMutation } from "@/features/auth/hooks/use-get-me-mutation";
import { createI18nInstance } from "@/i18n";
import { normalizeLocale, type Locale } from "@/lib/i18n/config";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import { Toaster } from "sonner";

type ProvidersProps = {
  children: React.ReactNode;
  initialLocale: Locale;
};

export default function Providers({ children, initialLocale }: ProvidersProps) {
  const locale = normalizeLocale(initialLocale);
  const i18n = useMemo(() => createI18nInstance(locale), [locale]);

  return (
    <I18nextProvider i18n={i18n}>
      <Toaster position="bottom-center" />
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
      </QueryClientProvider>
    </I18nextProvider>
  );
}
