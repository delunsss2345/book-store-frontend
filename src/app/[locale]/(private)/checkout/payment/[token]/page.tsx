import { notFound } from "next/navigation";
import PremiumPaymentContent from "./_components/PremiumPage";

export default async function PremiumPaymentPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = await params;

  console.log("payment page params:", resolvedParams);

  const { token } = resolvedParams;

  if (!token) {
    notFound();
  }

  return <PremiumPaymentContent tokenUrl={token} />;
}
