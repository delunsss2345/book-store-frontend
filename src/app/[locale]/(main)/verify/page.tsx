import { redirect } from "next/navigation";
import VerifyPageClient from "./page.client";

interface VerifyPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/");
  }

  return <VerifyPageClient token={token} />;
}
