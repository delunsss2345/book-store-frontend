"use client";

import { useForgotPasswordMutation } from "@/features/auth";
import useTranslator from "@/hooks/use-translator";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import ForgotPasswordForm, {
  ForgotPasswordValues,
} from "../_components/ForgotPasswordForm";

const ForgotPassword = () => {
  const { t } = useTranslator();
  const locale = useLocale();
  const forgotPasswordMutation = useForgotPasswordMutation();
  const isLoading = forgotPasswordMutation.isPending;

  const onSubmit = async (values: ForgotPasswordValues) => {
    toast.promise(forgotPasswordMutation.mutateAsync(values), {
      loading: t("auth.forgotSubmitting"),
      success: () => {
        return t("auth.success.forgot", { email: values.email });
      },
      error: t("auth.errors.requestFailed"),
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
          {t("auth.forgotTitle")}
        </h3>
        <p className="mt-1.5 mb-5 text-[13px] leading-6 text-ink-2">
          {t("auth.forgotSubtitle")}
        </p>

        <ForgotPasswordForm isLoading={isLoading} onSubmit={onSubmit} />

        <div className="mt-6 text-center">
          <Link
            href={`/${locale}/login`}
            className="text-[13px] font-medium text-ink-3 underline-offset-4 hover:text-accent hover:underline"
          >
            &larr; {t("auth.signIn")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
