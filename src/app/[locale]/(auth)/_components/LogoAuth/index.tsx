import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function LogoAuth() {
  const router = useRouter();
  const locale = useLocale();

  return (
    <div
      onClick={() => router.push(`/${locale}`)}
      className="mb-6 text-center cursor-pointer"
    >
      <div className="text-4xl font-extrabold tracking-wide">Velora</div>
    </div>
  );
}
