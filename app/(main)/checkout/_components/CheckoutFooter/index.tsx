"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

type CheckoutFooterProps = {
  buttonText: string;
  secureText?: string;
  buttonClassName?: string;
  disabled?: boolean;
};

export function CheckoutFooter({
  buttonText,
  secureText = "Thông tin của bạn luôn được bảo mật và mã hóa",
  buttonClassName,
  disabled,
}: CheckoutFooterProps) {
  return (
    <>
      <Button
        type="submit"
        className={
          buttonClassName ??
          "h-14 w-full rounded-xl bg-zinc-900 text-base font-bold text-white shadow-lg shadow-zinc-200 transition-all hover:bg-zinc-800 active:scale-[0.98]"
        }
      >
        {buttonText}
      </Button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-400">
        <ShieldCheck className="h-3.5 w-3.5" />
        {secureText}
      </p>
    </>
  );
}
