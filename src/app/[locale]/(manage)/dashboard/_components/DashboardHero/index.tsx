"use client";

import { Download, Sparkles } from "lucide-react";

export function DashboardHero() {
  return (
    <div className="card overflow-hidden">
      <div className="relative flex flex-col gap-4 bg-ink px-6 py-6 text-white sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="chip bg-white/10 text-white/80 ring-1 ring-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Dữ liệu trực tiếp
          </span>
          <h3 className="font-serif text-[30px] font-semibold leading-none mt-3" style={{ fontOpticalSizing: 'auto' }}>
            Trung tâm Phân tích Bán hàng
          </h3>
          <p className="mt-2 max-w-xl text-[13px] text-white/65">
            Tổng hợp tốc độ bán, cơ cấu kênh và sức khỏe vận hành trong một màn hình.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-soft rounded-lg bg-white/10 px-3.5 py-2 text-[13px] text-white ring-1 ring-white/15 hover:bg-white/20 border-transparent">
            <Download className="w-4 h-4" /> Xuất báo cáo
          </button>
          <button className="btn rounded-lg bg-white px-3.5 py-2 text-[13px] text-ink hover:bg-white/90">
            <Sparkles className="w-4 h-4" /> Xem insight
          </button>
        </div>
      </div>
    </div>
  );
}
