import { BarChart3, Download, Search, TrendingUp } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="min-w-0">
      <div className="topbar">
        <div className="searchbar max-w-md">
          <Search className="text-[15px]" />
          <input 
            type="text" 
            placeholder="Tìm báo cáo hoặc chỉ số…" 
            className="flex-1 bg-transparent border-0 outline-none min-w-0"
          />
        </div>
        <button className="ml-auto btn-soft rounded-lg px-3.5 py-2 text-[12.5px]">
          <Download className="h-4 w-4" /> Xuất báo cáo
        </button>
      </div>
      <div className="page">
        <div>
          <h1 className="page-title">Báo cáo & Thống kê</h1>
          <p className="page-sub">Theo dõi hiệu suất bán hàng, doanh thu và xu hướng thị trường.</p>
        </div>
        
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="stat">
            <span className="stat-k">Doanh thu tháng</span>
            <div className="stat-v">142,5tr ₫</div>
            <div className="mt-1 delta-up"><TrendingUp className="h-3 w-3" /> +12.5%</div>
          </div>
          <div className="stat">
            <span className="stat-k">Đơn hàng mới</span>
            <div className="stat-v">842</div>
            <div className="mt-1 delta-up"><TrendingUp className="h-3 w-3" /> +5.2%</div>
          </div>
          <div className="stat">
            <span className="stat-k">Tỷ lệ chuyển đổi</span>
            <div className="stat-v">3.8%</div>
            <div className="mt-1 delta-dn"><TrendingUp className="h-3 w-3 rotate-180" /> -0.4%</div>
          </div>
          <div className="stat">
            <span className="stat-k">Khách hàng mới</span>
            <div className="stat-v">156</div>
            <div className="mt-1 delta-up"><TrendingUp className="h-3 w-3" /> +2.1%</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="card p-5 lg:col-span-2 min-h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="display text-[18px] font-semibold text-ink">Biểu đồ doanh thu</h4>
              <div className="seg" data-seg="chart">
                <button className="on">7 ngày</button>
                <button>30 ngày</button>
                <button>Năm nay</button>
              </div>
            </div>
            <div className="h-full w-full flex flex-col items-center justify-center text-ink-3">
              <BarChart3 className="h-12 w-12 opacity-20 mb-3" />
              <p className="text-sm">Đang tải dữ liệu biểu đồ...</p>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="px-5 py-4 border-b border-line">
              <h4 className="display text-[18px] font-semibold text-ink">Sách bán chạy</h4>
            </div>
            <div className="divide-y divide-line">
              <div className="flex items-center gap-3 p-4">
                <div className="h-10 w-8 bg-line rounded shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink truncate">Nhà Giả Kim</p>
                  <p className="text-[11px] text-ink-3">Paulo Coelho</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-ink">412</p>
                  <p className="text-[11px] text-ink-3">quyển</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <div className="h-10 w-8 bg-line rounded shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink truncate">Đắc Nhân Tâm</p>
                  <p className="text-[11px] text-ink-3">Dale Carnegie</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-ink">384</p>
                  <p className="text-[11px] text-ink-3">quyển</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <div className="h-10 w-8 bg-line rounded shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink truncate">Cây Cam Ngọt Của Tôi</p>
                  <p className="text-[11px] text-ink-3">José Mauro de Vasconcelos</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-ink">291</p>
                  <p className="text-[11px] text-ink-3">quyển</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
