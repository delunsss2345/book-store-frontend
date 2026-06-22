import { SidebarData } from "@/types/layouts/sidebar.type";
import {
  LayoutDashboard,
  Book,
  Tags,
  ShoppingCart,
  Truck,
  ClipboardList,
  PackageCheck,
  RefreshCcw,
  BarChart3,
  Users,
  ShieldCheck,
} from "lucide-react";

export const sidebarData: SidebarData = {
  user: {
    name: "phamthanhhuy",
    email: "huydev@gmail.com",
    avatar: "",
  },

  navGroups: [
    {
      title: "Tổng quan",
      items: [
        {
          title: "Dashboard",
          url: "dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Báo cáo",
          url: "dashboard/reports",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Sản phẩm",
      items: [
        {
          title: "Quản lý Sách",
          url: "dashboard/books",
          icon: Book,
        },

        {
          title: "Quản lý Thể loại",
          url: "dashboard/categories",
          icon: Tags,
        },
      ],
    },
    {
      title: "Bán hàng",
      items: [
        {
          title: "Khách hàng",
          url: "dashboard/customers",
          icon: Users,
        },
        {
          title: "Quản lý Đơn hàng",
          url: "dashboard/orders",
          icon: ShoppingCart,
        },

        {
          title: "Yêu cầu Hoàn/Đổi",
          url: "dashboard/return-requests",
          icon: RefreshCcw,
        },
      ],
    },
    {
      title: "Cung ứng",
      items: [
        {
          title: "Nhà cung cấp",
          url: "dashboard/suppliers",
          icon: Truck,
        },
        {
          title: "Quản lý Đơn nhập hàng",
          url: "dashboard/purchase-orders",
          icon: ClipboardList,
        },

        {
          title: "Phiếu Nhập kho",
          url: "dashboard/goods-receipt",
          icon: PackageCheck,
        },
        {
          title: "Quản lý Quyền",
          url: "dashboard/roles",
          icon: ShieldCheck,
        },
      ],
    },
  ],
};
