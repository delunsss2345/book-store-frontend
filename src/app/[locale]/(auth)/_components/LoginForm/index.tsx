import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useTranslator from "@/hooks/use-translator";
import { FormMessageI18n } from "@/src/components/common/FormMessageI18n";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Loader2 } from "lucide-react";

type TranslatorFn = ReturnType<typeof useTranslator>["t"];

const getLoginSchema = (t: TranslatorFn) =>
  z.object({
    email: z.string().email(t("auth.errors.emailInvalid")),
    password: z.string().min(6, t("auth.errors.passwordMin", { count: 6 })),
  });

export type LoginValues = z.infer<ReturnType<typeof getLoginSchema>>;

type LoginFormProps = {
  isLoading: boolean;
  onSubmit?: (values: LoginValues) => void | Promise<void>;
};

const LoginForm = ({ isLoading, onSubmit }: LoginFormProps) => {
  const { t } = useTranslator();
  const locale = useLocale();
  const loginSchema = React.useMemo(() => getLoginSchema(t), [t]);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const handleSubmit = async (values: LoginValues) => {
    await onSubmit?.(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flabel">{t("auth.emailLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("auth.emailPlaceholder")}
                  autoComplete="email"
                  className="field"
                  {...field}
                />
              </FormControl>
              <FormMessageI18n />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flabel">{t("auth.passwordLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("auth.passwordPlaceholder")}
                  autoComplete="current-password"
                  className="field"
                  {...field}
                />
              </FormControl>
              <FormMessageI18n />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Link
            href={`/${locale}/forgot-password`}
            className="text-[13px] font-medium text-ink-3 underline-offset-4 hover:text-accent hover:underline"
          >
            {t("auth.forgotLink")}
          </Link>
        </div>

        <button
          type="submit"
          className="btn-ink h-11 w-full rounded-lg text-[14px]"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? t("auth.loginLoading") : t("auth.signIn")}
        </button>
      </form>
    </Form>
  );
};

export default LoginForm;
