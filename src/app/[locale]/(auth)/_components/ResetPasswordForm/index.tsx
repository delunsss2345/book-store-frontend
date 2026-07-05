"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useTranslator from "@/hooks/use-translator";
import { FormMessageI18n } from "@/src/components/common/FormMessageI18n";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Loader2 } from "lucide-react";

type TranslatorFn = ReturnType<typeof useTranslator>["t"];

const getResetPasswordSchema = (t: TranslatorFn) =>
  z
    .object({
      token: z.string().min(1),
      email: z.string().email(t("auth.errors.emailInvalid")),
      password: z.string().min(6, t("auth.errors.passwordMin", { count: 6 })),
      passwordConfirmation: z
        .string()
        .min(6, t("auth.errors.passwordMin", { count: 6 })),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t("auth.errors.passwordMismatch"),
      path: ["passwordConfirmation"],
    });

export type ResetPasswordValues = z.infer<
  ReturnType<typeof getResetPasswordSchema>
>;

type ResetPasswordFormProps = {
  token?: string;
  isLoading?: boolean;
  onSubmit?: (values: ResetPasswordValues) => void | Promise<void>;
};

const ResetPasswordForm = ({
  token,
  isLoading = false,
  onSubmit,
}: ResetPasswordFormProps) => {
  const { t } = useTranslator();
  const resetSchema = React.useMemo(() => getResetPasswordSchema(t), [t]);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      token: token,
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    mode: "onSubmit",
  });

  const handleSubmit = async (values: ResetPasswordValues) => {
    await onSubmit?.(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Email */}
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

        {/* New password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flabel">{t("auth.newPasswordLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="field"
                  {...field}
                />
              </FormControl>
              <FormMessageI18n />
            </FormItem>
          )}
        />

        {/* Confirm password */}
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flabel">{t("auth.confirmPasswordLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="field"
                  {...field}
                />
              </FormControl>
              <FormMessageI18n />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="btn-ink h-11 w-full rounded-lg text-[13px] mt-5"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? t("auth.processing") : t("auth.resetSubmit")}
        </button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
