"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import CartSheet from "@/app/(main)/_components/Header/CartSheet";
import ProfileButton from "@/app/(main)/_components/Header/ProfileButton";
import SearchBar from "@/app/(main)/_components/Header/Search";
import SettingsTranslation from "@/app/(main)/_components/Header/SettingTranslation";
import { WishlistHeader } from "@/app/(main)/_components/Header/WishlistHeader";
import Nav from "@/app/(main)/_components/Nav";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white"
      style={{
        paddingLeft: "var(--container-px)",
        paddingRight: "var(--container-px)",
      }}
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between gap-6">
        {/* LEFT: Nav (Desktop) / Menu Icon (Mobile) */}
        <div className="flex-1">
          {isMobile ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="p-2 -ml-2 hover:bg-zinc-50 rounded-full transition-colors">
                  <Menu size={24} strokeWidth={1.5} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                <SheetHeader className="p-6 border-b text-left">
                  <SheetTitle className="text-2xl font-black tracking-tighter">
                    TASCHEN
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Menu Links */}
                <div className="flex flex-col py-4">
                  {/* Bạn có thể export biến 'nav' từ file Nav.tsx để map qua ở đây */}
                  <MobileNavLink
                    href="/books"
                    label="Books"
                    onClick={() => setOpen(false)}
                  />
                  <MobileNavLink
                    href="/limited-editions"
                    label="Limited Editions"
                    onClick={() => setOpen(false)}
                  />
                  <MobileNavLink
                    href="/gifts"
                    label="Gifts"
                    onClick={() => setOpen(false)}
                  />
                  <MobileNavLink
                    href="/stores"
                    label="Stores"
                    onClick={() => setOpen(false)}
                  />
                  <MobileNavLink
                    href="/about"
                    label="About"
                    onClick={() => setOpen(false)}
                  />

                  <div className="mt-8 px-6 pt-8 border-t border-zinc-100 flex flex-col gap-6">
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

        {/* CENTER: Logo */}
        <div className="flex-none">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-black tracking-tighter"
          >
            TASCHEN
          </Link>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex flex-1 items-center justify-end gap-1 md:gap-3">
          {!isMobile && (
            <div className="flex items-center gap-2">
              <SearchBar />
              <SettingsTranslation />
              <ProfileButton />
            </div>
          )}
          <WishlistHeader />
          <CartSheet />
        </div>
      </div>
    </header>
  );
};

// Helper component cho Mobile Links
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
    className="flex items-center justify-between px-6 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-50 border-b border-zinc-50 last:border-0"
  >
    {label}
    <ChevronRight size={16} className="text-zinc-400" />
  </Link>
);

export default Header;
