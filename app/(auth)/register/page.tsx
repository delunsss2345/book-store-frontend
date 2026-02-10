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

  const onSubmit = async (values: RegisterValues) => {
    toast.promise((registerMutation.mutateAsync(values)), {
      loading: 'Đang đăng ký',
      success: () => {
        router.push('/');
        return 'Đăng ký thành công! Vui lòng kiểm tra email để xác minh tài khoản.';
      },
      error: 'Đăng ký thất bại',
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

      <RegisterForm onSubmit={onSubmit} />
    </div>
  );
};

export default Register;
