import { ColumnDef } from "@tanstack/react-table";
import { Eye, Mail, MapPin, Phone, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AdminOrderStatus,
  AdminPaymentStatus,
  AdminUserOrder,
  UserAddress,
} from "@/types/response/admin.response";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const orderStatusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [AdminOrderStatus.PENDING]: "secondary",
  [AdminOrderStatus.PROCESSING]: "default",
  [AdminOrderStatus.SHIPPED]: "default",
  [AdminOrderStatus.DELIVERED]: "default",
  [AdminOrderStatus.CANCELLED]: "destructive",
  [AdminOrderStatus.RETURNED]: "outline",
};

const paymentStatusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [AdminPaymentStatus.UNPAID]: "secondary",
  [AdminPaymentStatus.PAID]: "default",
  [AdminPaymentStatus.REFUNDED]: "outline",
  [AdminPaymentStatus.FAILED]: "destructive",
};

type BuildUserOrderColumnsOptions = {
  onOpenDetail: (orderId: string) => void;
};

function formatAddress(addr: UserAddress): string {
  return [addr.addressDetail, addr.ward, addr.district, addr.city]
    .filter(Boolean)
    .join(", ");
}

export function buildUserOrderColumns({
  onOpenDetail,
}: BuildUserOrderColumnsOptions): ColumnDef<AdminUserOrder>[] {
  return [
    {
      accessorKey: "orderCode",
      header: () => <span>Mã đơn</span>,
      cell: ({ row }) => (
        <div className="min-w-24 font-medium text-foreground">
          #{row.original.orderCode}
        </div>
      ),
    },
    {
      id: "customer",
      header: () => <span>Khách đặt</span>,
      cell: ({ row }) => {
        const { user } = row.original;
        const fullName = user
          ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
          : "—";

        return (
          <div className="flex flex-col gap-1 min-w-44">
            <div className="flex items-center gap-1.5">
              <UserRound className="size-4 text-muted-foreground shrink-0" />
              <span className="font-medium text-foreground">{fullName}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Mail className="size-3.5 shrink-0" />
              <span>{user?.email ?? "Không có email"}</span>
            </div>
          </div>
        );
      },
    },
    {
      id: "address",
      header: () => <span>Người nhận & giao hàng</span>,
      cell: ({ row }) => {
        const addr = row.original.addressUser;

        if (!addr) {
          return (
            <span className="text-sm text-muted-foreground">
              Chưa có địa chỉ giao hàng
            </span>
          );
        }

        return (
          <div className="flex max-w-[360px] flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <UserRound className="size-4 text-muted-foreground" />
              <span className="font-medium text-foreground">
                {addr.recipientName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-4" />
              <span>{addr.phoneNumber}</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span className="break-words">{formatAddress(addr)}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <span>Trạng thái đơn</span>,
      cell: ({ row }) => (
        <Badge
          variant={orderStatusVariant[row.original.status ?? ""] ?? "outline"}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: () => <span>Thanh toán</span>,
      cell: ({ row }) => (
        <Badge
          variant={
            paymentStatusVariant[row.original.paymentStatus ?? ""] ?? "outline"
          }
        >
          {row.original.paymentStatus}
        </Badge>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: () => <div className="text-right">Tổng tiền</div>,
      cell: ({ row }) => (
        <div className="min-w-32 text-right font-medium text-foreground">
          {currencyFormatter.format(Number(row.original.totalAmount || 0))}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Thao tác</div>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenDetail(row.original.id)}
          >
            <Eye className="mr-2 size-4" />
            Xem chi tiết
          </Button>
        </div>
      ),
    },
  ];
}
