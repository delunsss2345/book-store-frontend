import { Search } from "@/src/components/common/Search";
import { SidebarProvider } from "@/src/components/ui/sidebar";
import type { ReactNode } from "react";
import { ProfileDropdown } from "../../profile/_components/ProfileDropdown";
import { AppSidebar } from "./_components/AppSidebar";
import { Main } from "./_components/Main";
import { Header } from "./dashboard/_components/Header";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider className="w-full">
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1">
          <Header>
            <div className="ms-auto flex items-center space-x-4">
              <Search />
              <ProfileDropdown />
            </div>
          </Header>
          <Main>{children}</Main>
        </main>
      </div>
    </SidebarProvider>
  );
}
