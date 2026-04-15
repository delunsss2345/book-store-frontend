import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TimelineCard() {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-950 dark:text-slate-50">
          Chi tiết lịch sử giao hàng
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Theo dõi các mốc vận chuyển mới nhất từ trên xuống dưới.
        </p>
      </CardHeader>

      <CardContent>
        <div className="relative">
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="space-y-6">
            {/* {timeline.map((item) => (
              <div key={item.id} className="relative flex gap-4">
                <div
                  className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border ${getTimelineNodeClass(
                    item.type,
                    item.isCurrent,
                  )}`}
                >
                  {getTimelineIcon(item.type, item.isCurrent)}
                </div>

                <div className="min-w-0 flex-1 rounded-2xl border border-border/70 bg-background p-4 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`text-base font-semibold ${
                            item.isCurrent
                              ? "text-blue-700 dark:text-blue-300"
                              : "text-slate-900 dark:text-slate-50"
                          }`}
                        >
                          {item.title}
                        </h3>

                        {item.isCurrent ? (
                          <Badge
                            variant="outline"
                            className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300"
                          >
                            Hiện tại
                          </Badge>
                        ) : null}
                      </div>

                      <p className="text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm text-muted-foreground">
                      {item.time}
                    </p>
                  </div>

                  {item.isCurrent ? (
                    <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-3 dark:border-blue-900/40 dark:bg-blue-950/20">
                      <p className="text-sm text-slate-700 dark:text-slate-200">
                        Trạng thái mới nhất. Khách hàng có thể xem nhanh vị trí
                        shipper từ đây.
                      </p>
                      <Button size="sm" className="hidden sm:inline-flex">
                        Xem vị trí shipper trên bản đồ
                      </Button>
                      <Button
                        size="icon"
                        className="sm:hidden"
                        aria-label="Xem vị trí shipper trên bản đồ"
                      >
                        <MapPin className="size-4" />
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
