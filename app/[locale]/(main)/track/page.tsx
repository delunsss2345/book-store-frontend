import LoadingState from "@/components/common/LoadingState";

import TimelineCard from "./_components/TimelineCard";
import MapPreviewCard from "./_components/MapPreviewCard";
import SummaryCard from "./_components/SummaryCard";
import EmptyState from "./_components/EmptyState";

const isLoading = false;
const hasOrder = true;

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
