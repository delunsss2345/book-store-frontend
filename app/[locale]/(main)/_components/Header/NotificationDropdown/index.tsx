"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationItem from "../NotificationItem";

const notifications = [
  {
    id: 1,
    title: "Đơn hàng đã được xác nhận",
    description:
      "Đơn hàng #ORD-1024 của bạn đã được chấp nhận và đang được xử lý.",
    status: "accepted" as const,
    minutesAgo: 5,
  },
  {
    id: 2,
    title: "Đơn hàng bị từ chối",
    description: "Đơn hàng #ORD-1021 bị từ chối do sản phẩm hiện đã hết hàng.",
    status: "rejected" as const,
    minutesAgo: 12,
  },
  {
    id: 3,
    title: "Yêu cầu hoàn tiền đã được chấp nhận",
    description: "Yêu cầu hoàn tiền cho đơn #ORD-0998 đã được duyệt.",
    status: "accepted" as const,
    minutesAgo: 24,
  },
];

export default function NotificationDropdown() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative rounded-full p-2 transition-colors hover:bg-zinc-50"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.5} />
          <span className="absolute right-1 top-1 size-2 rounded-full bg-rose-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[360px] rounded-2xl p-0 shadow-lg"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <DropdownMenuLabel className="p-0 text-sm font-semibold">
            Thông báo
          </DropdownMenuLabel>

          <Link
            href="/notifications"
            className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900"
          >
            Xem tất cả
          </Link>
        </div>

        <DropdownMenuSeparator />

        <div className="max-h-[380px] overflow-y-auto p-2">
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <NotificationItem
                key={item.id}
                title={item.title}
                description={item.description}
                status={item.status}
                minutesAgo={item.minutesAgo}
              />
            ))
          ) : (
            <div className="px-4 py-8 text-center text-sm text-zinc-500">
              Chưa có thông báo nào
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
