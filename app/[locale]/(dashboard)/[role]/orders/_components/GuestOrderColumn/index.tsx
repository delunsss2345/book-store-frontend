import { ColumnDef } from "@tanstack/react-table";
import {
  Check,
  Eye,
  MapPin,
  MoreHorizontal,
  Phone,
  UserRound,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AdminGuestOrder,
  AdminOrderStatus,
  AdminPaymentStatus,
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

type BuildGuestOrderColumnsOptions = {
  onOpenDetail: (orderId: string) => void;
  handleUpdateOrderStatus: (orderId: string, status: AdminOrderStatus) => void;
};

export function buildGuestOrderColumns({
  onOpenDetail,
  handleUpdateOrderStatus,
}: BuildGuestOrderColumnsOptions): ColumnDef<AdminGuestOrder>[] {
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
      id: "guestEmail",
      header: () => <span>Email khách</span>,
      cell: ({ row }) => (
        <div className="flex min-w-40 flex-col gap-1">
          <span className="font-medium text-foreground">Khách vãng lai</span>
          <span className="text-sm text-muted-foreground">
            {row.original.guestEmail ?? "Không có email"}
          </span>
        </div>
      ),
    },
    {
      id: "address",
      header: () => <span>Người nhận & giao hàng</span>,
      cell: ({ row }) => {
        const address = row.original.address;

        if (!address) {
          return (
            <span className="text-sm text-muted-foreground">
              Chưa có địa chỉ giao hàng
            </span>
          );
        }

        const fullAddress = [
          address.addressLine,
          address.ward,
          address.district,
          address.city,
        ]
          .filter(Boolean)
          .join(", ");

        return (
          <div className="flex max-w-[360px] flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <UserRound className="size-4 text-muted-foreground" />
              <span className="font-medium text-foreground">
                {address.recipientName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-4" />
              <span>{address.phoneNumber}</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span className="break-words">{fullAddress}</span>
            </div>
            {address.note ? (
              <div className="rounded-md border bg-muted px-2 py-1 text-xs text-muted-foreground">
                Ghi chú: {address.note}
              </div>
            ) : null}
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
      cell: ({ row }) => {
        const order = row.original;
        const canApprove = order.status === AdminOrderStatus.PENDING_PAYMENT;
        const canReject = order.status === AdminOrderStatus.PENDING_PAYMENT;

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={() => onOpenDetail(order.id)}>
                  <Eye className="mr-2 size-4" />
                  Xem chi tiết
                </DropdownMenuItem>

                {canApprove && (
                  <DropdownMenuItem
                    onClick={() =>
                      handleUpdateOrderStatus(
                        order.id,
                        AdminOrderStatus.CONFIRMED,
                      )
                    }
                  >
                    <Check className="mr-2 size-4" />
                    Duyệt đơn
                  </DropdownMenuItem>
                )}

                {canReject && (
                  <DropdownMenuItem
                    onClick={() =>
                      handleUpdateOrderStatus(
                        order.id,
                        AdminOrderStatus.CANCELLED,
                      )
                    }
                    className="text-destructive focus:text-destructive"
                  >
                    <X className="mr-2 size-4" />
                    Từ chối đơn
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
