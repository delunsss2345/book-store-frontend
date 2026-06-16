import { ColumnDef } from "@tanstack/react-table";
import {
  Check,
  Eye,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  UserRound,
  X,
} from "lucide-react";

import { ApproveOrderAdmin, ModalType } from "@/features/modal";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
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
  onShowModel: (type: ModalType.ORDER_APPROVAL_ADMIN) => void;
  onSetActionApproveOrder: (action: ApproveOrderAdmin) => void;
};

function formatAddress(addr: UserAddress): string {
  return [addr.addressDetail, addr.ward, addr.district, addr.city]
    .filter(Boolean)
    .join(", ");
}

export function buildUserOrderColumns({
  onOpenDetail,
  onShowModel,
  onSetActionApproveOrder,
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
          <div className="flex min-w-44 flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <UserRound className="size-4 shrink-0 text-muted-foreground" />
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
      cell: ({ row }) => {
        const order = row.original;
        console.log(order.status);
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
                    onClick={() => {
                      (onShowModel(ModalType.ORDER_APPROVAL_ADMIN),
                        onSetActionApproveOrder({
                          orderId: order.id,
                          status: AdminOrderStatus.CONFIRMED,
                        }));
                    }}
                  >
                    <Check className="mr-2 size-4" />
                    Duyệt đơn
                  </DropdownMenuItem>
                )}

                {canReject && (
                  <DropdownMenuItem
                    onClick={() => {
                      (onShowModel(ModalType.ORDER_APPROVAL_ADMIN),
                        onSetActionApproveOrder({
                          orderId: order.id,
                          status: AdminOrderStatus.CANCELLED,
                        }));
                    }}
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
