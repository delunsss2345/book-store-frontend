"use client";
import CartSheet from "@/app/(main)/_components/Header/CartSheet";
import ProfileButton from "@/app/(main)/_components/Header/ProfileButton";
import SearchBar from "@/app/(main)/_components/Header/Search";
import SettingsTranslation from "@/app/(main)/_components/Header/SettingTranslation";
import { WishlistHeader } from "@/app/(main)/_components/Header/WishlistHeader";
import Nav from "@/app/(main)/_components/Nav";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="relative z-50 w-full bg-white" style={{ paddingLeft: 'var(--container-px)', paddingRight: 'var(--container-px)' }}>
      <div className="mx-auto flex h-16 w-full items-center justify-between gap-6">
        {isMobile ? (
          <div>
            <Menu />
          </div>
        ) : (
          <Nav />
        )}

        <div className="text-center">
          <div className="text-3xl font-black">TASCHEN</div>
        </div>

        <div className="flex items-center gap-3">
          {!isMobile ? (
            <div className="flex items-center gap-2">
              <SearchBar />
              <SettingsTranslation />
              <ProfileButton />
            </div>
          ) : null}

          <WishlistHeader />
          <CartSheet />
        </div>
      </div>
    </header>
  );
};

export default Header;
