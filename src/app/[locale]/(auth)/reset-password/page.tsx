"use client";

import useTranslator from "@/hooks/use-translator";
import {
  useResetPasswordMutation,
  useResetPasswordValidateMutation,
} from "@/features/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { Loader2, KeyRound } from "lucide-react";
import { Suspense, useEffect } from "react";
import ResetPasswordForm, {
  ResetPasswordValues,
} from "../_components/ResetPasswordForm";

const ResetPasswordContent = () => {
  const { t } = useTranslator();
  const { mutateAsync: resetPasswordMutation, isPending: isResetPending } =
    useResetPasswordMutation();
  const { mutateAsync: validateResetPassword, isPending: isValidatePending } =
    useResetPasswordValidateMutation();
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const token = searchParams.get("verify-token");
  useEffect(() => {
    if (!token) return;
    toast.promise(validateResetPassword({ token }), {
      loading: t("auth.validating"),
      success: (data) => {
        if (!data.valid) {
          toast.error(t("auth.errors.invalidLink"));
          router.replace(`/${locale}/forgot-password`);
          return;
        }
        return t("auth.success.validating");
      },
      error: (error) => error?.message || t("auth.errors.requestFailed"),
    });
  }, [token]);

  if (!token) {
    toast.error(t("auth.errors.invalidLink"));
    router.replace(`/${locale}/forgot-password`);
    return null;
  }

  const onSubmit = async (values: ResetPasswordValues) => {
    toast.promise(resetPasswordMutation(values), {
      loading: t("auth.resetting"),
      success: () => {
        router.replace(`/${locale}/login`);
        return t("auth.success.reset");
      },
      error: (error) => error?.message || t("auth.errors.requestFailed"),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-paper">
      <div className="mb-10 text-center text-3xl font-black tracking-tightest">
        Velora
      </div>

      <div className="card w-full max-w-sm p-7 shadow-sm bg-surface">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <KeyRound className="h-5 w-5" />
        </div>
        <h3 className="display mt-4 text-[22px] font-semibold">
          {t("auth.passwordResetTitle")}
        </h3>
        <p className="mt-1.5 mb-5 text-[13px] leading-6 text-ink-2">
          {t("auth.passwordResetSubtitle")}
        </p>

        {isValidatePending ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-ink-3" />
          </div>
        ) : (
          <ResetPasswordForm
            token={token}
            isLoading={isResetPending}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<div className="h-24" />}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
