"use client";

import { useAuthStore } from "@/features/auth";
import {
  selectorCurrentUser,
  selectorIsAuthHydrated,
} from "@/features/auth/selector/auth.selector";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React from "react";
import Header from "./_components/Header";
import { Footer } from "./_components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const locale = useLocale();
  const currentUser = useAuthStore(selectorCurrentUser);
  const isHydrated = useAuthStore(selectorIsAuthHydrated);
  React.useEffect(() => {
    if (!isHydrated) return;
    if (!currentUser) router.replace(`/${locale}/login`);
  }, [isHydrated, currentUser, router]);

  if (!isHydrated) return null;
  if (!currentUser) return null;
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
