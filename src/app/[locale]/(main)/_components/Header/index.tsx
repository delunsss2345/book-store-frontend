"use client";
import { ChevronRight, Menu, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import Nav from "../Nav";
import CartSheet from "./CartSheet";
import NotificationDropdown from "./NotificationDropdown";
import ProfileButton from "./ProfileButton";
import SearchBar from "./Search";
import SettingsTranslation from "./SettingTranslation";
import { WishlistHeader } from "./WishlistHeader";
import { useLocale, useTranslations } from "next-intl";

const Header = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-6 px-6 lg:px-10">
        <div className="flex-1">
          {isMobile ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="-ml-2 rounded-full p-2 text-ink transition-colors hover:bg-paper">
                  <Menu size={24} strokeWidth={1.5} />
                </button>
              </SheetTrigger>

              <SheetContent side="left" className="w-[300px] p-0 sm:w-[400px]">
                <SheetHeader className="border-b border-line p-6 text-left">
                  <SheetTitle className="text-[24px] font-black tracking-tightest">
                    Velora
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col py-4">
                  <MobileNavLink
                    href={`/${locale}/books`}
                    label={t("header.nav.books") || "Books"}
                    onClick={() => setOpen(false)}
                  />

                  <MobileNavLink
                    href={`/${locale}/orders`}
                    label={t("profile.header.menu.orders") || "Orders"}
                    onClick={() => setOpen(false)}
                  />

                  <div className="mt-8 flex flex-col gap-6 border-t border-line px-6 pt-8">
                    <div className="flex items-center gap-4">
                      <SearchBar />
                      <span className="text-[13px] font-medium text-ink">
                        {t("header.mobile.search") || "Search"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <SettingsTranslation />
                      <span className="text-[13px] font-medium text-ink">
                        {t("header.mobile.language") || "Language / Currency"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <ProfileButton />
                      <span className="text-[13px] font-medium text-ink">
                        {t("header.mobile.account") || "My Account"}
                      </span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Nav />
          )}
        </div>

        <Link
          href={`/${locale}`}
          className="text-[24px] font-black tracking-tightest md:text-[26px] flex-none text-ink"
        >
          Velora
        </Link>

        <div className="flex flex-1 items-center justify-end gap-0.5">
          {!isMobile && (
            <>
              <SearchBar />
              <SettingsTranslation />
              <ProfileButton />
              <NotificationDropdown />
              <button
                type="button"
                onClick={() => router.push(`/${locale}/orders`)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink transition hover:bg-paper"
                aria-label="Orders"
              >
                <Package size={18} strokeWidth={1.5} />
              </button>
            </>
          )}

          <WishlistHeader />
          <CartSheet />
        </div>
      </div>
    </header>
  );
};

const MobileNavLink = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center justify-between border-b border-zinc-50 px-6 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-50 last:border-0"
  >
    {label}
    <ChevronRight size={16} className="text-zinc-400" />
  </Link>
);

export default Header;
