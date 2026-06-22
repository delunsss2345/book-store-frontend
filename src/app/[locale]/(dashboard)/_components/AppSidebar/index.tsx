"use client";
import { NavGroup } from "@/src/components/common/NavGroup";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/src/components/ui/sidebar";
import { sidebarData } from "../../dashboard/data/sidebar-data";

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-line bg-[#FBFAF7]">
      <SidebarHeader>
        <div className="side-brand">
          <span className="text-[19px] font-black tracking-tightest text-ink">Velora</span>
          <span className="hidden rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white sm:inline">Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3">
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
