"use client";

import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { Toaster } from "sonner";
import { ModalHost } from "@/src/components/common/Modal";
import { AuthProvider } from "@/src/components/auth/AuthProvider";

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
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Ho_Chi_Minh">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster position="bottom-center" />
          <ModalHost />
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
