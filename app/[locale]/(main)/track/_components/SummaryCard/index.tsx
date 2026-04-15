import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, User } from "lucide-react";
// { order }: { order: OrderSummary }
export default function SummaryCard() {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Đơn hàng
            </p>
            <CardTitle className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              {/* {order.code} */}
            </CardTitle>
          </div>
          {/* ${getStatusBadgeClass(order.status)} */}
          <Badge
            variant="outline"
            className={`w-fit rounded-full px-3 py-1 text-sm font-medium `}
          >
            {/* {getStatusLabel(order.status)} */}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background">
                <User className="size-4 text-slate-700 dark:text-slate-200" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Người nhận</p>
                <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">
                  {/* {order.recipientName} */}
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="size-4" />
                  {/* <span>{order.recipientPhone}</span> */}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background">
                <MapPin className="size-4 text-slate-700 dark:text-slate-200" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">
                  Địa chỉ giao hàng
                </p>
                <p className="mt-1 text-base font-semibold leading-6 text-slate-900 dark:text-slate-50">
                  {/* {order.address} */}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {/* {order.provinceName} · Mã tỉnh: {order.provinceCode} */}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm text-muted-foreground">Mock tỉnh đang dùng:</p>
          {/* {PROVINCES.map((province) => (
            <Badge
              key={province.code}
              variant="secondary"
              className="rounded-full px-3 py-1 font-normal"
            >
              {province.name}
            </Badge>
          ))} */}
        </div>
      </CardContent>
    </Card>
  );
}
