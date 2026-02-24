import { SidebarData } from "@/types/layouts/sidebar.type";
import {
  Bell,
  HelpCircle,
  LayoutDashboard,
  ListTodo,
  MessagesSquare,
  Monitor,
  Package,
  Palette,
  Settings,
  UserCog,
  Users,
  Wrench,
} from "lucide-react";

export const sidebarData: SidebarData = {
  user: {
    name: "phamthanhhuy",
    email: "huydev@gmail.com",
    avatar: "",
  },
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Products",
          url: "products",
          icon: ListTodo,
        },
        {
          title: "Orders",
          url: "orders",
          icon: Package,
        },
        {
          title: "Categories",
          url: "categories",
          icon: MessagesSquare,
        },
        {
          title: "Users",
          url: "users",
          icon: Users,
        },
      ],
    },

    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: Settings,
          items: [
            {
              title: "Profile",
              url: "/settings",
              icon: UserCog,
            },
            {
              title: "Account",
              url: "/settings/account",
              icon: Wrench,
            },
            {
              title: "Appearance",
              url: "/settings/appearance",
              icon: Palette,
            },
            {
              title: "Notifications",
              url: "/settings/notifications",
              icon: Bell,
            },
            {
              title: "Display",
              url: "/settings/display",
              icon: Monitor,
            },
          ],
        },
        {
          title: "Help Center",
          url: "/help-center",
          icon: HelpCircle,
        },
      ],
    },
  ],
};
