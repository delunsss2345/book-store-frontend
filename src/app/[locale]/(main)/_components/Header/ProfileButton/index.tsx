import { useAuthStore } from "@/features/auth";
import useTranslator from "@/hooks/use-translator";
import { User } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

const ProfileButton = () => {
  const { t } = useTranslator();
  const local = useLocale();
  return (
    <button
      type="button"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink transition hover:bg-paper"
      aria-label={t("header.aria.account")}
    >
      <Link href={`/${local}/profile/settings`}>
        <User className="h-[18px] w-[18px]" />
      </Link>
    </button>
  );
};

export default ProfileButton;
