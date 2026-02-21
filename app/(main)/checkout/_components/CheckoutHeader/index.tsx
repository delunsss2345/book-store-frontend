"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type CheckoutHeaderProps = {
  title: string;
  backHref?: string;
  backText?: string;
  right?: React.ReactNode;
};

export function CheckoutHeader({
  title,
  backHref = "/cart",
  backText = "Quay lại giỏ hàng",
  right,
}: CheckoutHeaderProps) {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => router.push(backHref)}
        className="mb-4 flex items-center text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        {backText}
      </button>

      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">
          {title}
        </h2>
        {right}
      </div>
    </div>
  );
}
