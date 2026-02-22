"use client";
import ResetPasswordForm, {
  ResetPasswordValues,
} from "@/app/(auth)/_components/ResetPasswordForm";
import useTranslator from "@/hooks/use-translator";
import {
  useAuthStore,
  useResetPasswordMutation,
  useResetPasswordValidateMutation,
} from "@/features/auth";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const ResetPassword = () => {
  const { t } = useTranslator();
  const { mutateAsync: resetPasswordMutation, isPending: isResetPending } =
    useResetPasswordMutation();
  const { mutateAsync: validateResetPassword, isPending: isValidatePending } =
    useResetPasswordValidateMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("verify-token");

  if (!token) {
    toast.error("Liên kết không hợp lệ!");
    router.replace("/forgot-password");
    return;
  }
  useEffect(() => {
    toast.promise(validateResetPassword({ token }), {
      loading: t("auth.validating"),
      success: (data) => {
        if (!data.valid) {
          toast.error("Liên kết không hợp lệ!");
          router.replace("/forgot-password");
          return;
        }
        return t("auth.success.validating");
      },
      error: t("auth.errors.requestFailed"),
    });
  }, [token]);

  const onSubmit = async (values: ResetPasswordValues) => {
    toast.promise(resetPasswordMutation(values), {
      loading: t("auth.resetting"),
      success: () => {
        router.replace("/login");
        return t("auth.success.reset");
      },
      error: t("auth.errors.requestFailed"),
    });
  };

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

      {isValidatePending ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <ResetPasswordForm
          token={token}
          isLoading={isResetPending}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default ResetPassword;
