"use client";

import i18n from "@/i18n";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { I18nextProvider } from "react-i18next";
import { Toaster } from "sonner";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <SessionProvider>
        <Toaster position="bottom-center" />
        <QueryClientProvider client={queryClient}>
          {children}
          {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
        </QueryClientProvider>
      </SessionProvider>
    </I18nextProvider>
  );
}
