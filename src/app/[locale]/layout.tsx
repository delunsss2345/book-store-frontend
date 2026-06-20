import { routing } from "@/i18n/routing";
import { ModalHost } from "@/src/components/common/Modal";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import Providers from "../providers";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <Providers locale={locale} messages={messages}>
      <ModalHost />
      <Toaster position="bottom-center" />
      {children}
    </Providers>
  );
}
