"use client";
import { Link } from "@/i18n/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/src/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/src/components/ui/sidebar";
import {
  NavCollapsible,
  NavGroup as NavGroupProps,
  NavItem,
  NavLink,
} from "@/types/layouts/sidebar.type";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { Badge } from "../../ui/badge";

export function NavGroup({ title, items }: NavGroupProps) {
  const pathname = usePathname() ?? "";
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="nav-label">{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`;

          if (!item.items) {
            return <SidebarMenuLink key={key} item={item} href={pathname} />;
          }

          return (
            <SidebarMenuCollapsible key={key} item={item} href={pathname} />
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavBadge({ children }: { children: ReactNode }) {
  return <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>;
}

function SidebarMenuLink({ item, href }: { item: NavLink; href: string }) {
  const { setOpenMobile } = useSidebar();
  const isActive = checkIsActive(href, item);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.title}
        className={isActive ? "nav-item active" : "nav-item"}
      >
        <Link href={item.url as any} onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function SidebarMenuCollapsible({
  item,
  href,
}: {
  item: NavCollapsible;
  href: string;
}) {
  const { setOpenMobile } = useSidebar();
  const isActive = checkIsActive(href, item, true);
  return (
    <Collapsible
      asChild
      defaultOpen={isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} className={isActive ? "nav-item active" : "nav-item"}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.items.map((subItem) => {
              const isSubActive = checkIsActive(href, subItem);
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={isSubActive}
                    className={isSubActive ? "text-ink font-semibold" : "text-ink-2"}
                  >
                    <Link href={subItem.url as any} onClick={() => setOpenMobile(false)}>
                      {subItem.icon && <subItem.icon />}
                      <span>{subItem.title}</span>
                      {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

function checkIsActive(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url || !!item?.items?.filter((i) => i.url === href).length
  );
}
