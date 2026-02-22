"use client";

import ForgotPasswordForm, {
  type ForgotPasswordValues,
} from "@/app/(auth)/_components/ForgotPasswordForm";
import { useForgotPasswordMutation } from "@/features/auth";
import useTranslator from "@/hooks/use-translator";
import { toast } from "sonner";

const ForgotPassword = () => {
  const { t } = useTranslator();
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
    <div className="space-y-4">
      <>
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">{t("auth.forgotTitle")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("auth.forgotSubtitle")}
          </p>
        </div>

        <ForgotPasswordForm isLoading={isLoading} onSubmit={onSubmit} />
      </>
    </div>
  );
};

export default ForgotPassword;
