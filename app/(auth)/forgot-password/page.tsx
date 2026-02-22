"use client";

import ForgotPasswordForm, {
  type ForgotPasswordValues,
} from "@/app/(auth)/_components/ForgotPasswordForm";
import { useAuthStore, useForgotPasswordMutation } from "@/features/auth";
import useTranslator from "@/hooks/use-translator";
import { toast } from "sonner";
import VerifyOtpForm from "../_components/VerifyOtpForm";
import { useEffect } from "react";

const ForgotPassword = () => {
  const { t } = useTranslator();
  const forgotPasswordMutation = useForgotPasswordMutation();
  const isSendOTP = useAuthStore((state) => state.isSendOTP);
  const setIsSendOTP = useAuthStore((state) => state.setIsSendOTP);
  const isLoading = forgotPasswordMutation.isPending;
  useEffect(() => {
    return () => {
      setIsSendOTP(false);
    };
  }, []);
  const onSubmit = async (values: ForgotPasswordValues) => {
    toast.promise(forgotPasswordMutation.mutateAsync(values), {
      loading: t("auth.forgotSubmitting"),
      success: () => {
        setIsSendOTP(true);
        return t("auth.success.forgot");
      },
      error: t("auth.errors.requestFailed"),
    });
  };

  return (
    <div className="space-y-4">
      {isSendOTP ? (
        <VerifyOtpForm />
      ) : (
        <>
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-semibold">{t("auth.forgotTitle")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("auth.forgotSubtitle")}
            </p>
          </div>

          <ForgotPasswordForm isLoading={isLoading} onSubmit={onSubmit} />
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
