"use client";

import { useAuth } from "@/src/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect } from "react";

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user: currentUser, isLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (currentUser) {
      router.push(`/${locale}`);
    }
  }, [router, currentUser, locale]);

  if (isLoading || currentUser) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
