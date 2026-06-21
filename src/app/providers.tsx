"use client";

import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { Toaster } from "sonner";
import { ModalHost } from "@/src/components/common/Modal";

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};

export default function Providers({
  children,
  locale,
  messages,
}: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-center" />
        <ModalHost />
        {children}
        {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
