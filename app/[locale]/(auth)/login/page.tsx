"use client";

import { useLoginMutation } from "@/features/auth/hooks/use-login-mutation";
import useTranslator from "@/hooks/use-translator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import ForgotPasswordLink from "../_components/ForgotPasswordLink";
import LoginForm, { LoginValues } from "../_components/LoginForm";

const Login = () => {
  const { t } = useTranslator();
  const router = useRouter();
  const locale = useLocale();

  const loginMutation = useLoginMutation();
  const isLoading = loginMutation.isPending;

  const onSubmit = async (values: LoginValues) => {
    toast.promise(loginMutation.mutateAsync(values), {
      loading: t("auth.loginLoading"),
      success: () => {
        router.push(`/${locale}`);
        return t("auth.success.login");
      },
      error: (err) => {
        return err.response.data.message;
      },
    });
  };

  return (
    <>
      <LoginForm isLoading={isLoading} onSubmit={onSubmit} />
      <ForgotPasswordLink />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        {t("auth.noAccount")}{" "}
        <Link
          href="/register"
          className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          {t("auth.signUp")}
        </Link>
      </p>
    </>
  );
};

export default Login;
