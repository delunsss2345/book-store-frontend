import { Suspense } from "react";
import PremiumPaymentContent from "./_components/PremiumPage";

export default async function PremiumPaymentPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950" />}
    >
      <PremiumPaymentContent tokenUrl={token} />
    </Suspense>
  );
}
