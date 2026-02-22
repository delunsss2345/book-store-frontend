"use client";
import ResetPasswordForm from "@/app/(auth)/_components/ResetPasswordForm";
import useTranslator from "@/hooks/use-translator";
import { useAuthStore } from "@/features/auth";
import { redirect } from "next/navigation";

const ResetPassword = () => {
  const { t } = useTranslator();
  const isResetPassword = useAuthStore((state) => state.isResetPassword);
  // if (!isResetPassword) {
  //   redirect("/forgot-password");
  // }
  const onSubmit = async () => {};

  return (
    <div className="space-y-4">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold">
          {t("auth.passwordResetTitle")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("auth.passwordResetSubtitle")}
        </p>
      </div>

      <ResetPasswordForm onSubmit={onSubmit} />
    </div>
  );
};

export default ResetPassword;
