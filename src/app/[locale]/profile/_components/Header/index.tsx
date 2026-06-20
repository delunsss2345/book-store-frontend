"use client";

import { ChevronDown, LogOut, Package, Settings, User, Laptop } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useLogoutMutation } from "@/features/auth/hooks/use-logout-mutation";
import useTranslator from "@/hooks/use-translator";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

const Header = () => {
  const { t } = useTranslator();
  const { mutateAsync } = useLogoutMutation();
  const router = useRouter();
  const locale = useLocale();

  const handleLogout = async () => {
    toast.promise(mutateAsync(), {
      loading: t("auth.loggingOut"),
      success: () => {
        router.push(`/${locale}`);
        return t("auth.success.logout");
      },
      error: t("auth.errors.requestFailed"),
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Left Side: Logo & Main Nav */}
        <div className="flex items-center gap-8">
          <Link
            href={`/${locale}`}
            className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity"
          >
            Velora
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={`/${locale}/profile/library`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("library.header.nav")}
            </Link>
            <Link
              href={`/${locale}/orders`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("profile.header.orderHistory")}
            </Link>
            <Link
              href={`/${locale}/profile/settings/session`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("profile.header.sessions") || "Sessions & Devices"}
            </Link>
          </nav>
        </div>

        {/* Right Side: User Actions */}
        <div className="flex items-center gap-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-full justify-start gap-2 px-2 hover:bg-muted"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium hidden sm:inline-block">
                  {t("profile.header.account")}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {t("profile.header.myAccount")}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {t("profile.header.manageSettings")}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href={`/${locale}/profile`} className="flex w-full items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t("profile.header.menu.profile")}</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href={`/${locale}/profile/library`} className="flex w-full items-center">
                  <Package className="mr-2 h-4 w-4" />
                  <span>{t("library.header.nav")}</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href={`/${locale}/orders`} className="flex w-full items-center">
                  <Package className="mr-2 h-4 w-4" />
                  <span>{t("profile.header.menu.orders")}</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href={`/${locale}/profile/settings/session`} className="flex w-full items-center">
                  <Laptop className="mr-2 h-4 w-4" />
                  <span>{t("profile.header.sessions") || "Sessions"}</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("profile.header.menu.signOut")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
