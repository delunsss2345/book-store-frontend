import { SidebarData } from "@/types/layouts/sidebar.type";
import {
  LayoutDashboard,
  Book,
  Tags,
  ShoppingCart,
  BadgePercent,
  Truck,
  ClipboardList,
  PackageCheck,
  Layers,
  RefreshCcw,
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
      title: "Tổng quan",
      items: [
        {
          title: "Dashboard",
          url: "dashboard/overview",
          icon: LayoutDashboard,
        },
        {
          title: "Báo cáo",
          url: "reports",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Sản phẩm",
      items: [
        {
          title: "Thêm sách mới",
          url: "books/create",
          icon: Book,
        },
        {
          title: "Quản lý Thể loại",
          url: "categories",
          icon: Tags,
        },
      ],
    },
    {
      title: "Bán hàng",
      items: [
        {
          title: "Quản lý Đơn hàng",
          url: "orders",
          icon: ShoppingCart,
        },
        {
          title: "Khuyến mãi",
          url: "promotions",
          icon: BadgePercent,
        },
        {
          title: "Yêu cầu Hoàn/Đổi",
          url: "return-requests",
          icon: RefreshCcw,
        },
      ],
    },
    {
      title: "Cung ứng",
      items: [
        {
          title: "Nhà cung cấp",
          url: "suppliers",
          icon: Truck,
        },
        {
          title: "Tạo đơn nhập hàng",
          url: "purchase-orders/create",
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
      ],
    },
  ],
};
