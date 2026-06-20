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
import { Loader2 } from "lucide-react";

type TranslatorFn = ReturnType<typeof useTranslator>["t"];

const getRegisterSchema = (t: TranslatorFn) =>
  z
    .object({
      firstName: z.string().min(1, t("auth.errors.required")),
      lastName: z.string().min(1, t("auth.errors.required")),
      email: z.string().email(t("auth.errors.emailInvalid")),
      password: z.string().min(6, t("auth.errors.passwordMin", { count: 6 })),
      confirmPassword: z
        .string()
        .min(6, t("auth.errors.passwordMin", { count: 6 })),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: t("auth.errors.passwordMismatch"),
      path: ["confirmPassword"],
    });

export type RegisterValues = z.infer<ReturnType<typeof getRegisterSchema>>;

type RegisterFormProps = {
  isLoading?: boolean;
  onSubmit?: (values: RegisterValues) => void | Promise<void>;
};

const RegisterForm = ({ isLoading = false, onSubmit }: RegisterFormProps) => {
  const { t } = useTranslator();
  const registerSchema = React.useMemo(() => getRegisterSchema(t), [t]);
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const handleSubmit = async (values: RegisterValues) => {
    await onSubmit?.(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flabel">{t("auth.firstNameLabel")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("auth.firstNamePlaceholder")}
                    autoComplete="given-name"
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flabel">{t("auth.lastNameLabel")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("auth.lastNamePlaceholder")}
                    autoComplete="family-name"
                    className="field"
                    {...field}
                  />
                </FormControl>
                <FormMessageI18n />
              </FormItem>
            )}
          />
        </div>

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
                  autoComplete="new-password"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flabel">{t("auth.confirmPasswordLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("auth.confirmPasswordPlaceholder")}
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
          className="btn-ink h-11 w-full rounded-lg text-[14px] mt-2"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? t("auth.registering") : t("auth.registerSubmit")}
        </button>
      </form>
    </Form>
  );
};

export default RegisterForm;
