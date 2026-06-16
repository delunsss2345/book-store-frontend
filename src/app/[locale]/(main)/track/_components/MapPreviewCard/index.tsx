import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
// { order }: { order: OrderSummary }
export default function MapPreviewCard() {
  return (
    <Card className="overflow-hidden border-border/70 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base text-slate-900 dark:text-slate-50">
              Vị trí giao hàng
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Bản đồ minh hoạ nhỏ cho vị trí shipper và điểm nhận hàng.
            </p>
          </div>
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300"
          >
            Live UI Mock
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <iframe
          className="w-full h-[240px] rounded-xl border border-border/70"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyADncH1ZSwfI1znbg60e6f59XayRb9EUNA&q=record+stores+in+Seattle`}
        ></iframe>
      </CardContent>
    </Card>
  );
}
