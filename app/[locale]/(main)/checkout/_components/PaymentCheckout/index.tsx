import { CreditCard } from "lucide-react";
import { PaymentMethodRadio } from "../PaymentMethodRadio";

export function PaymentCheckout() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b pb-2">
        <CreditCard className="h-5 w-5 text-zinc-800" />
        <h2 className="text-lg font-semibold">Phương thức thanh toán</h2>
      </div>

      <PaymentMethodRadio variant="compact" defaultValue="sepay" />
    </section>
  );
}
