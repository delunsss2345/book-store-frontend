"use client";

import { useLoginMutation } from "@/features/auth/hooks/use-login-mutation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import ForgotPasswordLink from "../_components/ForgotPasswordLink";
import LoginForm, { LoginValues } from "../_components/LoginForm";

const Login = () => {
  const router = useRouter();
  const locale = useLocale();

  const loginMutation = useLoginMutation();
  const isLoading = loginMutation.isPending;

  const onSubmit = async (values: LoginValues) => {
    toast.promise(loginMutation.mutateAsync(values), {
      loading: "Đang đăng nhập",
      success: () => {
        router.push(`/${locale}`);
        return "Đăng nhập thành công";
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
        Chưa có tài khoản?{" "}
        <Link
          href="/register"
          className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          Đăng ký
        </Link>
      </p>
    </>
  );
};

export default Login;
