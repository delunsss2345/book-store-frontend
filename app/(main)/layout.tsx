"use client";

import Footer from "@/app/(main)/_components/Footer";
import Header from "@/app/(main)/_components/Header";
import { useGetMeMutation } from "@/features/auth/hooks/use-get-me-mutation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { mutateAsync: getMe } = useGetMeMutation();
  useEffect(() => {
    getMe();
  }, [getMe]);
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
