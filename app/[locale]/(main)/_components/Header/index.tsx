"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronRight, Package } from "lucide-react";
import { useRouter } from "next/navigation";

import { useIsMobile } from "@/hooks/use-mobile";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SettingsTranslation from "./SettingTranslation";
import SearchBar from "./Search";
import ProfileButton from "./ProfileButton";
import { WishlistHeader } from "./WishlistHeader";
import CartSheet from "./CartSheet";
import Nav from "../Nav";
import NotificationDropdown from "./NotificationDropdown";

const Header = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white"
      style={{
        paddingLeft: "var(--container-px)",
        paddingRight: "var(--container-px)",
      }}
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between gap-6">
        <div className="flex-1">
          {isMobile ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="-ml-2 rounded-full p-2 transition-colors hover:bg-zinc-50">
                  <Menu size={24} strokeWidth={1.5} />
                </button>
              </SheetTrigger>

              <SheetContent side="left" className="w-[300px] p-0 sm:w-[400px]">
                <SheetHeader className="border-b p-6 text-left">
                  <SheetTitle className="text-2xl font-black tracking-tighter">
                    TASCHEN
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col py-4">
                  <MobileNavLink
                    href="/books"
                    label="Books"
                    onClick={() => setOpen(false)}
                  />

                  <MobileNavLink
                    href="/orders"
                    label="Orders"
                    onClick={() => setOpen(false)}
                  />

                  <div className="mt-8 flex flex-col gap-6 border-t border-zinc-100 px-6 pt-8">
                    <div className="flex items-center gap-4">
                      <SearchBar />
                      <span className="text-sm font-medium">Search</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <SettingsTranslation />
                      <span className="text-sm font-medium">
                        Language / Currency
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <ProfileButton />
                      <span className="text-sm font-medium">My Account</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Nav />
          )}
        </div>

        <div className="flex-none">
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter md:text-3xl"
          >
            TASCHEN
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-1 md:gap-3">
          {!isMobile && (
            <div className="flex items-center gap-2">
              <SearchBar />
              <SettingsTranslation />
              <ProfileButton />
              <NotificationDropdown />
              <button
                type="button"
                onClick={() => router.push("/orders")}
                className="rounded-full p-2 transition-colors hover:bg-zinc-50"
                aria-label="Orders"
              >
                <Package size={20} strokeWidth={1.5} />
              </button>
            </div>
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
