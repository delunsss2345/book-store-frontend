import { Search } from "@/components/common/Search";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";
import { AppSidebar } from "./_components/AppSidebar";
import { Header } from "./dashboard/_components/Header";
import { TopNav } from "./dashboard/_components/TopNav";
import { ProfileDropdown } from "../../profile/_components/ProfileDropdown";
import { Main } from "./_components/Main";

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
