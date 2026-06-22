"use client";

import { useQueryMe } from "@/features/auth/hooks/use-query-me";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect } from "react";

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { data, isLoading } = useQueryMe();
  const currentUser = data?.data;
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (currentUser) {
      router.push(`/${locale}`);
    }
  }, [currentUser, router]);

  if (isLoading || currentUser) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
