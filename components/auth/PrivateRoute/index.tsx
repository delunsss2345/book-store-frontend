"use client";

import { selectorCurrentUser } from "@/features/auth/selector/auth.selector";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect } from "react";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const currentUser = useAuthStore(selectorCurrentUser);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!currentUser) {
      router.push(`/${locale}/login`);
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
