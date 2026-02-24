"use client";

import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" />
      {children}
      {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
    </QueryClientProvider>
  );
}
