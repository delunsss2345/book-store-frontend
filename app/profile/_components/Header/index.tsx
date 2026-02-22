"use client";

import { ChevronDown, User } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useLogoutMutation } from "@/features/auth/hooks/use-logout-mutation";
import useTranslator from "@/hooks/use-translator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Header = () => {
  const { t } = useTranslator();
  const { mutateAsync } = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    toast.promise(mutateAsync(), {
      loading: t("auth.registering"),
      success: t("auth.success.register"),
    });
    console.log("logout");
    router.push("/");
  };

  return (
    <header className="w-full">
      <div className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-semibold tracking-wide">
              TASCHEN
            </Link>

            <Link href="/account/orders">
              {t("profile.header.orderHistory")}
            </Link>
          </div>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/account/profile">
                  {t("profile.header.menu.profile")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/account/orders">
                  {t("profile.header.menu.orders")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a className="border-0! hover:none!" onClick={handleLogout}>
                  {t("profile.header.menu.signOut")}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 px-2 text-sm text-foreground hover:none"
              >
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
