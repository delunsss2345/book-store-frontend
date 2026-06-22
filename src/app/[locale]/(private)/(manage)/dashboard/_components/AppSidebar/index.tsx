"use client";
import { NavGroup } from "@/src/components/common/NavGroup";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/src/components/ui/sidebar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { sidebarData } from "../data/sidebar-data";

export function AppSidebar() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "vi";

  return (
    <Sidebar className="border-r border-line bg-[#FBFAF7]">
      <SidebarHeader>
        <Link href={`/${locale}`} className="side-brand hover:opacity-80 transition-opacity">
          <span className="text-[19px] font-black tracking-tightest text-ink">
            Velora
          </span>
          <span className="hidden rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white sm:inline">
            Admin
          </span>
        </Link>
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
