"use client";

import { useLoginMutation } from "@/features/auth/hooks/use-login-mutation";
import { useQueryMergeCart } from "@/features/cart/hooks";
import useTranslator from "@/hooks/use-translator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import LoginForm, { LoginValues } from "../_components/LoginForm";

const Login = () => {
  const { t } = useTranslator();
  const router = useRouter();
  const locale = useLocale();

  const loginMutation = useLoginMutation();
  const mergeCartMutation = useQueryMergeCart();
  const isLoading = loginMutation.isPending;

  const onSubmit = async (values: LoginValues) => {
    toast.promise(loginMutation.mutateAsync(values), {
      loading: t("auth.loginLoading"),
      success: () => {
        mergeCartMutation.mutate(
          {},
          {
            onError: (err) => {
              console.error("Merge cart failed silently:", err);
            },
          },
        );
        router.push(`/${locale}`);
        return t("auth.success.login");
      },
      error: (error) => error?.message || t("auth.errors.requestFailed"),
    });
  };

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-ink p-10 text-white md:flex">
        <div className="relative z-10 flex items-center gap-2">
          <Link
            href={`/${locale}`}
            className="text-2xl font-black tracking-tightest"
          >
            Velora
          </Link>
        </div>
        <div className="relative z-10 max-w-sm">
          <p className="eyebrow text-white/45">{t("auth.brand.eyebrow")}</p>
          <p className="display mt-4 text-[40px] font-medium leading-[1.05]">
            {t("auth.brand.loginTitle")}
          </p>
          <p className="mt-4 text-[14px] leading-7 text-white/55">
            {t("auth.brand.loginDescription")}
          </p>
        </div>
        <div className="pointer-events-none absolute -right-10 bottom-0 z-0 h-[360px] w-[260px] rotate-[6deg] overflow-hidden rounded-lg opacity-90 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"></div>
      </div>

      {/* Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-14 md:w-1/2">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 text-center text-3xl font-black tracking-tightest md:hidden">
            Velora
          </div>
          <p className="eyebrow text-accent">{t("auth.welcomeBack")}</p>
          <h2 className="display mt-2 text-[32px] font-semibold leading-none">
            {t("auth.loginTitle")}
          </h2>
          <p className="mt-2 text-[14px] text-ink-2 mb-8">
            {t("auth.loginSubtitle")}
          </p>

          <LoginForm isLoading={isLoading} onSubmit={onSubmit} />

          <p className="mt-6 text-center text-[14px] text-ink-2">
            {t("auth.noAccount")}{" "}
            <Link
              href={`/${locale}/register`}
              className="font-semibold text-ink underline underline-offset-4 hover:text-accent"
            >
              {t("auth.signUp")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
