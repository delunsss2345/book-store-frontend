"use client";

import { ChevronDown, LogOut, Package, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/features/auth/hooks/use-logout-mutation";
import useTranslator from "@/hooks/use-translator";

const Header = () => {
  const { t } = useTranslator();
  const { mutateAsync } = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    toast.promise(mutateAsync(), {
      loading: t("auth.loggingOut") || "Logging out...",
      success: () => {
        router.push("/");
        return t("auth.success.logout") || "Logged out successfully";
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
            href="/"
            className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity"
          >
            TASCHEN
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/account/orders"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("profile.header.orderHistory")}
            </Link>
          </nav>
        </div>

        {/* Right Side: User Actions */}
        <div className="flex items-center gap-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-full justify-start gap-2 px-2 hover:bg-accent"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium hidden sm:inline-block">
                  Account
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">My Account</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Manage your settings
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/account/profile"
                  className="flex w-full items-center"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t("profile.header.menu.profile")}</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/account/orders"
                  className="flex w-full items-center"
                >
                  <Package className="mr-2 h-4 w-4" />
                  <span>{t("profile.header.menu.orders")}</span>
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
