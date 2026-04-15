import LoadingState from "@/components/common/LoadingState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  PackageCheck,
  Phone,
  SearchX,
  Truck,
  User,
  Warehouse,
} from "lucide-react";
import TimelineCard from "./_components/TimelineCard";
import MapPreviewCard from "./_components/MapPreviewCard";
import SummaryCard from "./_components/SummaryCard";
import EmptyState from "./_components/EmptyState";

type TrackingStatus = "processing" | "delivering" | "success" | "failed";
type TimelineType = "pickup" | "warehouse" | "delivering";

type Province = {
  code: string;
  name: string;
};

type OrderSummary = {
  code: string;
  status: TrackingStatus;
  recipientName: string;
  recipientPhone: string;
  address: string;
  provinceCode: string;
  provinceName: string;
  shipperName: string;
};

type TimelineItem = {
  id: string;
  type: TimelineType;
  title: string;
  description: string;
  time: string;
  isCurrent?: boolean;
};

const PROVINCES: Province[] = [
  { code: "HCM", name: "TP. Hồ Chí Minh" },
  { code: "HN", name: "Hà Nội" },
  { code: "DN", name: "Đà Nẵng" },
  { code: "CT", name: "Cần Thơ" },
  { code: "HP", name: "Hải Phòng" },
  { code: "BD", name: "Bình Dương" },
];

const order: OrderSummary = {
  code: "#DH12345678",
  status: "delivering",
  recipientName: "Nguyễn Văn B",
  recipientPhone: "0901 234 ***",
  address: "125 Nguyễn Trãi, Phường Bến Thành, Quận 1",
  provinceCode: "HCM",
  provinceName: "TP. Hồ Chí Minh",
  shipperName: "Trần Minh Khang",
};

const timeline: TimelineItem[] = [
  {
    id: "delivering",
    type: "delivering",
    title: "Hàng đang giao tới",
    description: `Shipper ${order.shipperName} đang đến địa chỉ nhận hàng.`,
    time: "14:00 - 14/04/2026",
    isCurrent: true,
  },
  {
    id: "warehouse",
    type: "warehouse",
    title: "Hàng đang ở Kho B",
    description:
      "Đơn hàng đã nhập kho trung chuyển miền Nam và đang được điều phối.",
    time: "09:00 - 14/04/2026",
  },
  {
    id: "pickup",
    type: "pickup",
    title: "Nguyễn Văn A vừa lấy hàng",
    description:
      "Shipper Nguyễn Văn A đã lấy hàng thành công từ người gửi Lê Văn C.",
    time: "16:00 - 13/04/2026",
  },
];

const isLoading = false;
const hasOrder = true;

function getStatusLabel(status: TrackingStatus) {
  switch (status) {
    case "processing":
      return "Chờ xử lý";
    case "delivering":
      return "Đang giao";
    case "success":
      return "Thành công";
    case "failed":
      return "Thất bại";
    default:
      return "Không xác định";
  }
}

function getStatusBadgeClass(status: TrackingStatus) {
  switch (status) {
    case "processing":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300";
    case "delivering":
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300";
    case "success":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300";
    case "failed":
      return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300";
    default:
      return "";
  }
}

function getTimelineIcon(type: TimelineType, isCurrent?: boolean) {
  const iconClass = isCurrent
    ? "size-4 text-blue-600 dark:text-blue-400"
    : "size-4 text-slate-600 dark:text-slate-300";

  switch (type) {
    case "delivering":
      return (
        <Truck className={`${iconClass} ${isCurrent ? "animate-pulse" : ""}`} />
      );
    case "warehouse":
      return <Warehouse className={iconClass} />;
    case "pickup":
      return (
        <PackageCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
      );
    default:
      return <PackageCheck className={iconClass} />;
  }
}

function getTimelineNodeClass(type: TimelineType, isCurrent?: boolean) {
  if (isCurrent) {
    return "border-blue-200 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300";
  }

  if (type === "pickup") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300";
  }

  return "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300";
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.08),_transparent_28%),linear-gradient(180deg,rgba(248,250,252,1),rgba(255,255,255,1))] px-4 py-8 dark:bg-[radial-gradient(circle_at_top,_rgba(51,65,85,0.35),_transparent_24%),linear-gradient(180deg,rgba(2,6,23,1),rgba(15,23,42,1))] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="space-y-3">
          <div className="inline-flex items-center rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
            Delivery Tracking Page
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
              Theo dõi đơn hàng
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Giao diện tracking tối giản, ưu tiên trạng thái hiện tại, tóm tắt
              đơn hàng và lịch sử vận chuyển rõ ràng.
            </p>
          </div>
        </header>

        {isLoading ? <LoadingState /> : null}

        {!isLoading && !hasOrder ? <EmptyState /> : null}

        {!isLoading && hasOrder ? (
          <div className="grid gap-6">
            <SummaryCard />

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <TimelineCard />
              <MapPreviewCard />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
