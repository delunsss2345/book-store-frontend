"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Copy,
  ShieldCheck,
  ArrowLeft,
  QrCode,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

function PremiumPaymentContent() {
  const t = useTranslations();
  const [timeOut, setTimeOut] = useState(10 * 60);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOut((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  // Lấy dữ liệu từ URL
  const amountParam = searchParams.get("totalAmount") || "0";
  const orderCode = searchParams.get("orderCode") || "PAYMENT";
  const subtotalParam = searchParams.get("subtotal") || "0";
  const totalAmount = parseInt(amountParam);
  const subtotal = parseInt(subtotalParam);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankInfo = {
    name: "MBBank",
    fullName: t("checkout.paymentPage.bankFullName"),
    acc: "17979220797979",
    vaCode: "VQRQAHCEN2724",
  };

  const qrUrl = `https://qr.sepay.vn/img?bank=${bankInfo.name}&acc=${bankInfo.vaCode}&template=compact&amount=${totalAmount}&des=${orderCode}`;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount);
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950 flex items-center justify-center p-4 md:p-6 font-sans text-zinc-900 dark:text-zinc-100">
      <Card className=" p-0 w-full max-w-5xl grid md:grid-cols-12 overflow-hidden border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] rounded-[2rem]">
        {/* CỘT TRÁI: TÓM TẮT ĐƠN HÀNG (4/12) */}
        <div className="md:col-span-5 lg:col-span-4 bg-zinc-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="mb-12 -ml-2 text-zinc-400 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> {t("checkout.paymentPage.back")}
            </Button>

            <div className="space-y-8">
              <div>
                <Badge className="bg-blue-500/20 text-blue-400 border-none mb-4 px-3">
                  {t("checkout.paymentPage.orderBadge")}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                  {t("checkout.paymentPage.title")}
                </h2>
                <p className="text-zinc-400 font-mono text-sm">#{orderCode}</p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">{t("checkout.paymentPage.subtotal")}</span>
                  <span>{formatCurrency(subtotal)}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">{t("checkout.paymentPage.shippingFee")}</span>
                  <span className="text-green-400">20.000đ</span>
                </div>
                <Separator className="bg-zinc-800" />
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-500 text-sm">{t("checkout.paymentPage.total")}</span>
                  <span className="text-4xl font-black text-white tracking-tighter">
                    {formatCurrency(totalAmount)}
                    <span className="text-xl ml-1 text-blue-500">đ</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-4 rounded-2xl bg-white/5 border border-white/10 relative z-10">
            <div className="flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {t.rich("checkout.paymentPage.secureNote", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
            </div>
          </div>

          {/* Trang trí background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
        </div>

        {/* CỘT PHẢI: QUÉT MÃ QR (8/12) */}
        <div className="md:col-span-7 lg:col-span-8 bg-white dark:bg-zinc-950 p-8 md:p-12">
          <div className="max-w-md mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-amber-600 bg-amber-50 dark:bg-amber-900/20 w-fit mx-auto px-4 py-1.5 rounded-full border border-amber-100 dark:border-amber-800">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {t("checkout.paymentPage.waiting")} | {Math.floor(timeOut / 60)}:
                  {(timeOut % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
                {t("checkout.paymentPage.scanToComplete")}
              </h3>
            </div>

            {/* QR Section */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10 rounded-[3rem] -z-10 opacity-50" />
              <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100 relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-50 flex items-center justify-center">
                  <img
                    src={qrUrl}
                    alt="Payment QR"
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                {/* Status indicator */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-4 py-1.5 rounded-full shadow-xl flex items-center gap-2 min-w-[140px] justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {t("checkout.paymentPage.waitingScan")}
                  </span>
                </div>
              </div>
            </div>

            {/* Thông tin chuyển khoản chi tiết */}
            <div className="space-y-3 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <CopyCard
                  label={t("checkout.paymentPage.bank")}
                  value={bankInfo.name}
                  subValue={bankInfo.fullName}
                  onCopy={() => handleCopy(bankInfo.name, "bank")}
                  isCopied={copiedField === "bank"}
                />
                <CopyCard
                  label={t("checkout.paymentPage.accountNumber")}
                  value={bankInfo.acc}
                  onCopy={() => handleCopy(bankInfo.acc, "acc")}
                  isCopied={copiedField === "acc"}
                  mono
                />
              </div>

              <div className="w-full p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-blue-600 dark:text-blue-400 font-bold block mb-1">
                    {t("checkout.paymentPage.transferContent")}
                  </span>
                  <span className="text-base font-mono font-bold text-blue-700 dark:text-blue-300">
                    {orderCode}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(orderCode, "code")}
                  className="hover:bg-blue-100 dark:hover:bg-blue-800"
                >
                  {copiedField === "code" ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-blue-600" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Button className="w-full bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:scale-[1.02] active:scale-[0.98] transition-all h-14 rounded-2xl font-bold text-base shadow-xl">
                {t("checkout.paymentPage.confirmTransfer")}
              </Button>
              <div className="flex items-center justify-center gap-4 text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <QrCode className="w-4 h-4" />
                  <span className="text-[11px] font-medium uppercase tracking-wider font-mono">
                    VietQR
                  </span>
                </div>
                <div className="w-1 h-1 bg-zinc-300 rounded-full" />
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[11px] font-medium uppercase tracking-wider font-mono">
                    NAPAS 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function PremiumPaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc]" />}>
      <PremiumPaymentContent />
    </Suspense>
  );
}

// Component con để hiển thị các ô thông tin có thể copy
function CopyCard({
  label,
  value,
  subValue,
  onCopy,
  isCopied,
  mono = false,
}: any) {
  return (
    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 group hover:border-blue-200 dark:hover:border-blue-900 transition-all relative">
      <span className="text-[10px] uppercase text-zinc-400 font-bold block mb-1">
        {label}
      </span>
      <div className="flex items-center justify-between">
        <div>
          <span
            className={`text-sm font-bold leading-none ${mono ? "font-mono tracking-wider" : ""}`}
          >
            {value}
          </span>
          {subValue && (
            <span className="text-[10px] text-zinc-500 block mt-1">
              {subValue}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCopy}
          className="h-8 w-8 text-zinc-400 hover:text-blue-600"
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
