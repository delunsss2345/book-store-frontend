"use client";

import RegisterForm, { RegisterValues } from "@/app/(auth)/_components/RegisterForm";
import { useRegisterMutation } from "@/features/auth";
import useTranslator from "@/hooks/use-translator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Register = () => {
  const { t } = useTranslator();
  const router = useRouter();
  const registerMutation = useRegisterMutation();
  const isLoading = registerMutation.isPending;

  const onSubmit = async (values: RegisterValues) => {
    toast.promise(registerMutation.mutateAsync(values), {
      loading: t("auth.registering"),
      success: () => {
        router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
        return t("auth.success.register");
      },
      error: t("auth.errors.requestFailed"),
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
    </div>
  );
};

export default Register;
