"use client";

import RegisterForm, { RegisterValues } from "@/app/(auth)/_components/RegisterForm";
import { useRegisterMutation } from "@/features/auth";
import useTranslator from "@/hooks/use-translator";
import Link from "next/link";
import { toast } from "sonner";

const Register = () => {
  const { t } = useTranslator();
  const registerMutation = useRegisterMutation();
  const isLoading = registerMutation.isPending;

  const onSubmit = async (values: RegisterValues) => {
    toast.promise(registerMutation.mutateAsync(values), {
      loading: t("auth.registering"),
      success: t("auth.success.register"),
      error: (err) => {
        return err.response.data.message;
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold">{t("auth.registerTitle")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("auth.registerSubtitle")}
        </p>
      </div>

      <RegisterForm isLoading={isLoading} onSubmit={onSubmit} />

      {/* Quay lại đăng nhập */}
      <p className="text-center text-sm text-muted-foreground">
        Đã có tài khoản?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          Đăng nhập
        </Link>
      </p>
    </div>
  );
};

export default Register;
