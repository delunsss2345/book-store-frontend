"use client";

import { useAuthStore } from "@/features/auth";
import { useGetMeMutation } from "@/features/auth/hooks/use-get-me-mutation";
import { selectorCurrentUser } from "@/features/auth/selector/auth.selector";
import { useEffect } from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

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
