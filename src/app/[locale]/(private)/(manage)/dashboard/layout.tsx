import { SidebarProvider } from "@/src/components/ui/sidebar";
import { Languages, Settings, SearchIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ProfileDropdown } from "../../profile/_components/ProfileDropdown";
import { AppSidebar } from "./_components/AppSidebar";
import { Main } from "./_components/Main";
import { Header } from "./_components/Header";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider
      className="w-full"
      style={{ "--sidebar-width": "244px" } as React.CSSProperties}
    >
      <div className="shell flex-1 min-h-screen w-full bg-canvas font-sans text-ink antialiased">
        <AppSidebar />

        <div className="min-w-0 flex flex-col h-full">
          <Header>
            <div className="searchbar max-w-md hidden md:flex cursor-pointer">
              <SearchIcon className="text-[15px]" size={15} />
              <span>Tìm sách, đơn hàng, khách hàng…</span>
              <kbd className="ml-auto rounded border border-line bg-surface px-1.5 text-[11px]">
                ⌘K
              </kbd>
            </div>
            <div className="ms-auto flex items-center space-x-2">
              <button className="icon-btn">
                <Languages className="w-4 h-4" />
              </button>
              {/* <button className="icon-btn relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-surface"></span>
              </button> */}
              <button className="icon-btn">
                <Settings className="w-4 h-4" />
              </button>
              <ProfileDropdown />
            </div>
          </Header>
          <Main>{children}</Main>
        </div>
      </div>
    </SidebarProvider>
  );
}
