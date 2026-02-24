import { Search } from "@/components/common/Search";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";
import { AppSidebar } from "./dashboard/_components/AppSidebar";
import { Header } from "./dashboard/_components/Header";
import { TopNav } from "./dashboard/_components/TopNav";
import { ProfileDropdown } from "../../profile/_components/ProfileDropdown";

const topNav = [
  {
    title: "Overview",
    href: "/admin/dashboard/",
    isActive: true,
    disabled: false,
  },
  {
    title: "Customers",
    href: "/admin/dashboard/customers",
    isActive: false,
    disabled: true,
  },
  {
    title: "Products",
    href: "/admin/dashboard/products",
    isActive: false,
    disabled: true,
  },
  {
    title: "Settings",
    href: "/admin/dashboard/settings",
    isActive: false,
    disabled: true,
  },
];

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider className="w-full">
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1">
          <Header>
            <TopNav links={topNav} />
            <div className="ms-auto flex items-center space-x-4">
              <Search />
              <ProfileDropdown />
            </div>
          </Header>

          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
