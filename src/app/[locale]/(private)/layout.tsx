"use client";

import { AuthProvider } from "@/src/components/auth/AuthProvider";
import React from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
