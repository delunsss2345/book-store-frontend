"use client";

import Footer from "@/app/(main)/_components/Footer";
import Header from "@/app/(main)/_components/Header";
import { useAuthStore } from "@/features/auth";
import { useGetMeMutation } from "@/features/auth/hooks/use-get-me-mutation";
import { selectorCurrentUser } from "@/features/auth/selector/auth.selector";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { mutateAsync: getMe } = useGetMeMutation();
  const user = useAuthStore(selectorCurrentUser);
  useEffect(() => {
    if (user) {
      getMe();
    }
  }, [getMe, user]);
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
