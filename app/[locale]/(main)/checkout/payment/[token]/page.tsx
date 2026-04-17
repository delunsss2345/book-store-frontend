import { Suspense } from "react";
import PremiumPaymentContent from "./_components/PremiumPage";

export function PremiumPaymentPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950" />}
    >
      <PremiumPaymentContent />
    </Suspense>
  );
}
