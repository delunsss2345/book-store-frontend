"use client";

import { useCallback, useMemo } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAdminGuestOrdersQuery,
  useAdminUserOrdersQuery,
  useAdminStore,
} from "@/features/admin";
import { ModalType, useModalStore } from "@/features/modal";
import { AdminOrderStatus } from "@/types/response/admin.response";

import { buildGuestOrderColumns } from "./_components/GuestOrderColumn";
import { buildUserOrderColumns } from "./_components/UserOrderColumn";
import { OrderStatCard } from "./_components/OrderStatCard";
import { OrdersTable } from "./_components/OrdersTable";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function OrdersPage() {
  const { data: guestOrders = [], isPending: isGuestPending } =
    useAdminGuestOrdersQuery();
  const { data: userOrders = [], isPending: isUserPending } =
    useAdminUserOrdersQuery();

  const onOpen = useModalStore((state) => state.onOpen);
  const { setSelectOrderDetailId } = useAdminStore();

  const openOrderDetail = useCallback(
    (orderId: string) => {
      setSelectOrderDetailId(orderId);
      onOpen(ModalType.ORDER_DETAIL_ADMIN);
    },
    [onOpen, setSelectOrderDetailId],
  );

  const guestColumns = useMemo(
    () => buildGuestOrderColumns({ onOpenDetail: openOrderDetail }),
    [openOrderDetail],
  );

  const userColumns = useMemo(
    () => buildUserOrderColumns({ onOpenDetail: openOrderDetail }),
    [openOrderDetail],
  );

  const totalOrders = guestOrders.length + userOrders.length;

  const pendingCount = useMemo(
    () =>
      [...guestOrders, ...userOrders].filter(
        (o) => o.status === AdminOrderStatus.PENDING,
      ).length,
    [guestOrders, userOrders],
  );

  const totalRevenue = useMemo(
    () =>
      [...guestOrders, ...userOrders].reduce(
        (sum, o) => sum + Number(o.totalAmount || 0),
        0,
      ),
    [guestOrders, userOrders],
  );

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Quản lý đơn hàng
          </h1>
          <p className="text-sm text-muted-foreground">
            Hiển thị rõ người nhận, số điện thoại và địa chỉ để admin/saler
            duyệt đơn ít sai sót hơn.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <OrderStatCard
            title="Tổng đơn hàng"
            value={totalOrders}
            description="Tổng số đơn hiện có"
          />
          <OrderStatCard
            title="Đơn chờ duyệt"
            value={pendingCount}
            description="Cần ưu tiên xử lý"
          />
          <OrderStatCard
            title="Doanh thu"
            value={currencyFormatter.format(totalRevenue)}
            description="Tổng tiền từ tất cả đơn"
          />
        </section>

        <Tabs defaultValue="guest">
          <TabsList className="mb-2">
            <TabsTrigger value="guest">
              Khách vãng lai
              {guestOrders.length > 0 && (
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {guestOrders.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="user">
              User đăng ký
              {userOrders.length > 0 && (
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {userOrders.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guest">
            <OrdersTable
              data={guestOrders}
              columns={guestColumns}
              isPending={isGuestPending}
            />
          </TabsContent>

          <TabsContent value="user">
            <OrdersTable
              data={userOrders}
              columns={userColumns}
              isPending={isUserPending}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
