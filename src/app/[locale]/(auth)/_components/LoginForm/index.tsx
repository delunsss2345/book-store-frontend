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
              <FormLabel>{t("auth.emailLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("auth.emailPlaceholder")}
                  autoComplete="email"
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
              <FormLabel>{t("auth.passwordLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("auth.passwordPlaceholder")}
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessageI18n />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
          {isLoading ? t("auth.loginLoading") : t("auth.signIn")}
        </Button>

      </form>
    </Form>
  );
};

export default LoginForm;
