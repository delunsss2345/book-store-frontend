"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { TFunction } from "i18next";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormMessageI18n } from "@/components/common/FormMessageI18n";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useTranslator from "@/hooks/use-translator";
import { ResetPasswordSchema } from "@/validation/auth/resetPasswordValidation";

const getResetPasswordSchema = (t: TFunction) => ResetPasswordSchema;

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
        {/* Trường Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.emailLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("auth.emailPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessageI18n />
            </FormItem>
          )}
        />

        {/* Trường Mật khẩu mới */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.newPasswordLabel")}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessageI18n />
            </FormItem>
          )}
        />

        {/* Trường Xác nhận mật khẩu */}
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.confirmPasswordLabel")}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessageI18n />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? t("auth.processing") : t("auth.resetSubmit")}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
