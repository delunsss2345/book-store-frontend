'use client'
import { Footer } from "@/app/profile/_components/Footer";
import Header from "@/app/profile/_components/Header";
import { useAuthStore } from "@/features/auth";
import { useRouter } from "next/navigation";
import React from "react";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const currentUser = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  React.useEffect(() => {
    if (!isHydrated) return;
    if (!currentUser) router.replace("/login");
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
