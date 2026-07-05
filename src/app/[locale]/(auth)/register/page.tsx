"use client";

import { useRegisterMutation } from "@/features/auth";
import useTranslator from "@/hooks/use-translator";
import Link from "next/link";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import RegisterForm, { RegisterValues } from "../_components/RegisterForm";

const Register = () => {
  const { t } = useTranslator();
  const locale = useLocale();
  const registerMutation = useRegisterMutation();
  const isLoading = registerMutation.isPending;

  const onSubmit = async (values: RegisterValues) => {
    toast.promise(registerMutation.mutateAsync(values), {
      loading: t("auth.registering"),
      success: t("auth.success.register"),
      error: (error) => error?.message || t("auth.errors.requestFailed"),
    });
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-14 md:w-1/2">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 text-center text-3xl font-black tracking-tightest md:hidden">
            Velora
          </div>
          <p className="eyebrow text-accent">{t("auth.join")}</p>
          <h2 className="display mt-2 text-[32px] font-semibold leading-none">
            {t("auth.registerTitle")}
          </h2>
          <p className="mt-2 mb-7 text-[14px] text-ink-2">
            {t("auth.registerSubtitle")}
          </p>

          <RegisterForm isLoading={isLoading} onSubmit={onSubmit} />

          <p className="mt-6 text-center text-[14px] text-ink-2">
            {t("auth.hasAccount")}{" "}
            <Link
              href={`/${locale}/login`}
              className="font-semibold text-ink underline underline-offset-4 hover:text-accent"
            >
              {t("auth.signIn")}
            </Link>
          </p>
        </div>
      </div>
      {/* Brand panel (mirror) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-ink p-10 text-white md:flex">
        <div className="relative z-10 flex items-center justify-end gap-2">
          <Link href={`/${locale}`} className="text-2xl font-black tracking-tightest">Velora</Link>
        </div>
        <div className="relative z-10 ml-auto max-w-sm text-right">
          <p className="display text-[34px] font-medium italic leading-tight">
            {t("auth.brand.registerQuote")}
          </p>
          <p className="eyebrow mt-4 text-white/45">
            {t("auth.brand.registerCite")}
          </p>
        </div>
        <div className="pointer-events-none absolute -left-10 bottom-0 z-0 h-[360px] w-[260px] rotate-[-6deg] overflow-hidden rounded-lg opacity-90 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"></div>
      </div>
    </div>
  );
};

export default Register;
