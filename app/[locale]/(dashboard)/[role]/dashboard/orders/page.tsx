"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  MoreHorizontal,
  Search,
  Eye,
  FileDown,
  Filter,
  Package,
  CircleDot,
} from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import useTranslator from "@/hooks/use-translator";

// --- Mock Data & Types ---
type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";
type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";

const MOCK_ORDERS = [
  {
    id: "1",
    orderCode: "ORD-2024-001",
    guestEmail: "customer@example.com",
    status: "PROCESSING",
    paymentStatus: "PAID",
    totalAmount: 1250000,
    placedAt: "2024-03-20 10:30",
    items: [
      {
        id: "i1",
        productName: "Clean Code (Book)",
        quantity: 1,
        unitPrice: 500000,
        lineTotal: 500000,
      },
      {
        id: "i2",
        productName: "Refactoring (Book)",
        quantity: 2,
        unitPrice: 375000,
        lineTotal: 750000,
      },
    ],
  },
  {
    id: "2",
    orderCode: "ORD-2024-002",
    guestEmail: "guest_user_99@gmail.com",
    status: "PENDING",
    paymentStatus: "UNPAID",
    totalAmount: 450000,
    placedAt: "2024-03-21 14:15",
    items: [],
  },
];

export default function OrdersPage() {
  const { t } = useTranslator();
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "orderCode",
      header: t("dashboard.orders.table.columns.orderCode"),
      cell: ({ row }) => (
        <span className="font-bold text-blue-600">
          #{row.getValue("orderCode")}
        </span>
      ),
    },
    {
      accessorKey: "guestEmail",
      header: t("dashboard.orders.table.columns.customer"),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {row.getValue("guestEmail")}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Guest
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: t("dashboard.orders.table.columns.status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variants: Record<string, any> = {
          PENDING: "outline",
          PROCESSING: "secondary",
          SHIPPED: "default",
          DELIVERED: "success", // Cần custom màu success trong tailwind
          CANCELLED: "destructive",
        };
        return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
      },
    },
    {
      accessorKey: "paymentStatus",
      header: t("dashboard.orders.table.columns.payment"),
      cell: ({ row }) => {
        const pStatus = row.getValue("paymentStatus") as string;
        return (
          <div className="flex items-center gap-2">
            <CircleDot
              className={`h-2 w-2 ${pStatus === "PAID" ? "text-green-500" : "text-yellow-500"}`}
            />
            <span className="text-xs font-medium">{pStatus}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "totalAmount",
      header: t("dashboard.orders.table.columns.totalAmount"),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalAmount"));
        return (
          <div className="font-medium text-right font-mono tracking-tighter">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(amount)}
          </div>
        );
      },
    },
    {
      accessorKey: "placedAt",
      header: t("dashboard.orders.table.columns.placedAt"),
    },
    {
      id: "actions",
      header: t("dashboard.orders.table.columns.actions"),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* Chi tiết đơn hàng */}
          <OrderDetailsSheet order={row.original} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("dashboard.orders.table.actions.label")}</DropdownMenuLabel>
              <DropdownMenuItem>
                <FileDown className="mr-2 h-4 w-4" /> {t("dashboard.orders.table.actions.exportPdf")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                {t("dashboard.orders.table.actions.cancelOrder")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: MOCK_ORDERS,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("dashboard.orders.title")}</h2>
          <p className="text-muted-foreground">
            {t("dashboard.orders.subtitle")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" /> {t("dashboard.orders.exportExcel")}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("dashboard.orders.searchPlaceholder")} className="pl-8" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> {t("dashboard.orders.filterButton")}
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.id === "totalAmount" ? "text-right" : ""
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// --- Sub-component: Order Details Sheet ---
function OrderDetailsSheet({ order }: { order: any }) {
  const { t } = useTranslator();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1">
          <Eye className="h-4 w-4" /> {t("dashboard.orders.details.view")}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" /> {t("dashboard.orders.details.order")}{" "}{order.orderCode}
          </SheetTitle>
          <SheetDescription>
            {t("dashboard.orders.details.description")}
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Thông tin khách hàng */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase text-muted-foreground tracking-widest">
              {t("dashboard.orders.details.customer")}
            </h4>
            <p className="text-sm">{order.guestEmail}</p>
          </div>

          <Separator />

          {/* Danh sách OrderItems */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase text-muted-foreground tracking-widest">
              {t("dashboard.orders.details.products", { count: order.items.length })}
            </h4>
            {order.items.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-start text-sm border-b pb-3 last:border-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-muted-foreground text-xs">
                    {t("dashboard.orders.details.quantity")}: {item.quantity} x {item.unitPrice.toLocaleString()}đ
                  </p>
                </div>
                <p className="font-mono">{item.lineTotal.toLocaleString()}đ</p>
              </div>
            ))}
          </div>

          {/* Tổng kết tiền */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm italic">
              <span>{t("dashboard.orders.details.subtotal")}:</span>
              <span>{order.totalAmount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>{t("dashboard.orders.details.total")}:</span>
              <span className="text-blue-600">
                {order.totalAmount.toLocaleString()}đ
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
