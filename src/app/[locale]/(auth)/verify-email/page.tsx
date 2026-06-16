"use client";

import {
  useResendEmailMutation,
  useVerifyEmailMutation,
} from "@/features/auth";
import useTranslator from "@/hooks/use-translator";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import VerifyEmailForm, { VerifyEmailValues } from "../_components/VerifyForm";

type VerifyState = "idle" | "verifying" | "failed";

const VerifyEmailPageContent = () => {
  const { t } = useTranslator();
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email") ?? "";

  const verifyEmailMutation = useVerifyEmailMutation();
  const resendEmailMutation = useResendEmailMutation();

  const [verifyState, setVerifyState] = useState<VerifyState>(
    token ? "verifying" : "idle",
  );
  const hasTriggeredVerifyRef = useRef(false);

  useEffect(() => {
    if (!token || hasTriggeredVerifyRef.current) {
      return;
    }

    hasTriggeredVerifyRef.current = true;

    verifyEmailMutation.mutate(token, {
      onSuccess: () => {
        toast.success(t("auth.success.verify"));
        router.replace(`/${locale}/login`);
      },
      onError: () => {
        setVerifyState("failed");
        toast.error(t("auth.errors.verifyTokenInvalid"));
      },
    });
  }, [router, t, token, verifyEmailMutation]);

  const onResendSubmit = async (values: VerifyEmailValues) => {
    toast.promise(resendEmailMutation.mutateAsync(values), {
      loading: t("auth.sending"),
      success: t("auth.success.resend", { email: values.email }),
      error: t("auth.errors.requestFailed"),
    });
  };

  const isVerifying = token && verifyState === "verifying";
  const shouldShowResendForm = !token || verifyState === "failed";

  return (
    <div className="space-y-4">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold">{t("auth.verifyTitle")}</h1>
        <p className="text-sm text-muted-foreground">
          {isVerifying ? t("auth.verifyingToken") : t("auth.verifySubtitle")}
        </p>
      </div>

      {isVerifying ? (
        <div className="rounded-md border bg-muted/30 p-3 text-center text-sm text-muted-foreground">
          {t("auth.verifyingToken")}
        </div>
      ) : null}

      {shouldShowResendForm ? (
        <VerifyEmailForm
          defaultEmail={email}
          isLoading={resendEmailMutation.isPending}
          onSubmit={onResendSubmit}
        />
      ) : null}
    </div>
  );
};

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<div className="h-24" />}>
      <VerifyEmailPageContent />
    </Suspense>
  );
};

export default VerifyEmailPage;
