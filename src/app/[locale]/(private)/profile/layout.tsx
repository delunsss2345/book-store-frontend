"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Header from "./_components/Header";
import { Footer } from "./_components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/${locale}/login`);
    }
  }, [isLoading, user, router, locale]);

  if (isLoading || !user) {
    return null; // prevent rendering before redirect
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
