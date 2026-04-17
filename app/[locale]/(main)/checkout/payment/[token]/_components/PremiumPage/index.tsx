"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, Copy, QrCode, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useQueryOrderStatus } from "@/features/hooks/hooks/use-get-order-status";
// import { useQueryPaymentByToken } from "@/features/hooks/hooks/use-get-payment-by-token";
import { CopyCard } from "../CopyCard";

function PremiumPaymentContent() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams<{ token: string }>();

  const token = String(params?.token ?? "");
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  //   const { data: paymentData, isLoading: isPaymentLoading } =
  //     useQueryPaymentByToken(token, {
  //       enabled: !!token,
  //     });

  //   const payment = paymentData?.data;

  const orderCode = "";
  const totalAmount = 0;
  const qrImageUrl = "";
  const bankName = "MBBank";
  const bankFullName = "";
  const accountNumber = "";
  const transferContent = "";

  const { data: orderStatus } = useQueryOrderStatus(orderCode, {
    enabled: !!orderCode,
    refetchInterval: (query) => {
      const status = query.state.data?.data?.status;
      return status === "PAID" ? false : 5000;
    },
  });

  useEffect(() => {
    if (!token) return;
    if (timeLeft <= 0) {
      router.push("/orders");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, token, router]);

  useEffect(() => {
    if (orderStatus?.data?.status === "PAID") {
      toast.success(t("checkout.toast.paymentSuccess"), { duration: 5000 });
      router.push("/orders");
    }
  }, [orderStatus, router, t]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount);
  };

  const countdown = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  const handleCopy = async (text: string, field: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!token) {
    return <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950" />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950 flex items-center justify-center p-4 md:p-6 font-sans text-zinc-900 dark:text-zinc-100">
      <Card className="p-0 w-full max-w-5xl grid md:grid-cols-12 overflow-hidden border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] rounded-[2rem]">
        <div className="md:col-span-5 lg:col-span-4 bg-zinc-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="mb-12 -ml-2 text-zinc-400 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("checkout.paymentPage.back")}
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
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-500 text-sm">
                    {t("checkout.paymentPage.total")}
                  </span>
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

          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
        </div>

        <div className="md:col-span-7 lg:col-span-8 bg-white dark:bg-zinc-950 p-8 md:p-12">
          <div className="max-w-md mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-amber-600 bg-amber-50 dark:bg-amber-900/20 w-fit mx-auto px-4 py-1.5 rounded-full border border-amber-100 dark:border-amber-800">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {t("checkout.paymentPage.waiting")} | {countdown}
                </span>
              </div>

              <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
                {t("checkout.paymentPage.scanToComplete")}
              </h3>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10 rounded-[3rem] -z-10 opacity-50" />
              <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100 relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-50 flex items-center justify-center">
                  <img
                    src={`/api/payments/${token}/qr`}
                    alt="Payment QR"
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-4 py-1.5 rounded-full shadow-xl flex items-center gap-2 min-w-[140px] justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {t("checkout.paymentPage.waitingScan")}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <CopyCard
                  label={t("checkout.paymentPage.bank")}
                  value={bankName}
                  subValue={bankFullName}
                  onCopy={() => handleCopy(bankName, "bank")}
                  isCopied={copiedField === "bank"}
                />

                <CopyCard
                  label={t("checkout.paymentPage.accountNumber")}
                  value={accountNumber}
                  onCopy={() => handleCopy(accountNumber, "acc")}
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
                    {transferContent}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(transferContent, "code")}
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
export default PremiumPaymentContent;
