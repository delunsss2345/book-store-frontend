import { SidebarData } from "@/types/layouts/sidebar.type";
import {
  LayoutDashboard,
  Book,
  Tags,
  FileText,
  Users,
  ShoppingCart,
  BadgePercent,
  Truck,
  ClipboardList,
  PackageCheck,
  Layers,
  UserRound,
  RefreshCcw,
  RotateCcw,
  Inbox,
  BarChart3,
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
          url: "dashboard/overview",
          icon: LayoutDashboard,
        },
        {
          title: "Báo cáo",
          url: "/reports",
          icon: BarChart3,
        },
      ],
    },

    {
      title: "Quản lý",
      items: [
        {
          title: "Quản lý Sách",
          url: "books",
          icon: Book,
        },
        {
          title: "Quản lý Thể loại",
          url: "categories",
          icon: Tags,
        },
        {
          title: "Quản lý Đơn hàng",
          url: "orders",
          icon: ShoppingCart,
        },
        {
          title: "Quản lý Khuyến mãi",
          url: "promotions",
          icon: BadgePercent,
        },
        {
          title: "Quản lý Nhà cung cấp",
          url: "suppliers",
          icon: Truck,
        },
        {
          title: "Quản lý Đơn Đặt hàng",
          url: "purchase-orders",
          icon: ClipboardList,
        },
        {
          title: "Phiếu Nhập kho",
          url: "goods-receipt",
          icon: PackageCheck,
        },
        {
          title: "Quản lý Lô hàng",
          url: "batches",
          icon: Layers,
        },
        {
          title: "Quản lý Khách hàng",
          url: "customers",
          icon: UserRound,
        },
        {
          title: "Yêu cầu Hoàn/Đổi",
          url: "return-requests",
          icon: RefreshCcw,
        },
      ],
    },
  ],
};
