"use client";

import Footer from "@/app/(main)/_components/Footer";
import Header from "@/app/(main)/_components/Header";
import ChatWidget from "@/app/(main)/_components/ChatWidget";



export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
