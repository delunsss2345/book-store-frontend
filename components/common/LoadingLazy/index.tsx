"use client";

import { cn } from "@/lib/utils";

export function LoadingLazy() {
  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background animate-in fade-in zoom-out-95 duration-1000">
      <div className="relative flex flex-col items-center gap-8">
        <div className="relative overflow-hidden">
          <h1
            className={cn(
              "text-5xl md:text-7xl font-[1000] tracking-[0.4em] text-foreground/50 select-none",
              "transition-all duration-1000 group-hover:text-foreground", // Optional hover state
            )}
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontStretch: "70%", // Ép chữ hẹp lại hơn nữa cho vibe "condensed luxury"
            }}
          >
            TASCHEN
          </h1>

          {/* HIỆU ỨNG MỚI: Dải sáng quét sắc nét lộ chữ (Revealing Shine) */}
          <div
            className={cn(
              "absolute inset-0 z-10",
              "text-foreground text-5xl md:text-7xl font-[1000] tracking-[0.4em]",
              "animate-[shine-reveal_4s_infinite_ease-in-out]",
              "mask-image-gradient",
            )}
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontStretch: "70%",
              // Dùng clip-text để gradient chỉ hiện trong chữ
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              // Gradient sắc nét tạo dải sáng quét
              background:
                "linear-gradient(to right, transparent 30%, rgb(var(--foreground)) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
          >
            TASCHEN
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="h-[1px] w-40 overflow-hidden bg-muted">
            <div className="h-full bg-foreground animate-[loading-bar_2.5s_infinite_easeInOutQuart]" />
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.6em] text-muted-foreground/40 ml-[0.6em]">
            Loading Experience
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <div className="h-6 w-[1px] bg-muted-foreground/10" />
        <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-muted-foreground/20 italic">
          The Art of Books
        </p>
      </div>
    </div>
  );
}
