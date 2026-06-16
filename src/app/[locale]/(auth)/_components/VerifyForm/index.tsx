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

const getVerifyEmailSchema = (t: TranslatorFn) =>
  z.object({
    email: z.string().email(t("auth.errors.emailInvalid")),
  });

export type VerifyEmailValues = z.infer<ReturnType<typeof getVerifyEmailSchema>>;

type VerifyEmailFormProps = {
  isLoading?: boolean;
  defaultEmail?: string;
  onSubmit?: (values: VerifyEmailValues) => void | Promise<void>;
};

const VerifyEmailForm = ({
  isLoading = false,
  defaultEmail = "",
  onSubmit,
}: VerifyEmailFormProps) => {
  const { t } = useTranslator();
  const verifyEmailSchema = React.useMemo(() => getVerifyEmailSchema(t), [t]);

  const form = useForm<VerifyEmailValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { email: defaultEmail },
    mode: "onSubmit",
  });

  React.useEffect(() => {
    form.reset({ email: defaultEmail });
  }, [defaultEmail, form]);

  const handleSubmit = async (values: VerifyEmailValues) => {
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("auth.sending") : t("auth.sendVerifyEmail")}
        </Button>
      </form>
    </Form>
  );
};

export default VerifyEmailForm;
