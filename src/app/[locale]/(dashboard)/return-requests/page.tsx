import { Check, Ellipsis, Search, SlidersHorizontal, X } from "lucide-react";

export default async function ReturnRequestsPage() {
  return (
    <div className="min-w-0">
      <div className="topbar">
        <div className="searchbar max-w-md">
          <Search className="text-[15px]" />
          <input 
            type="text" 
            placeholder="Tìm mã đơn / khách hàng…" 
            className="flex-1 bg-transparent border-0 outline-none min-w-0"
          />
        </div>
        <button className="ml-auto btn-soft rounded-lg px-3 py-2 text-[12.5px]">
          <SlidersHorizontal className="h-4 w-4" /> Lọc
        </button>
      </div>
      <div className="page">
        <div>
          <h1 className="page-title">Yêu cầu Hoàn / Đổi</h1>
          <p className="page-sub">Duyệt và xử lý yêu cầu trả hàng, đổi hàng từ khách.</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="stat ring-1 ring-amber-500/30">
            <span className="stat-k">Chờ xử lý</span>
            <div className="stat-v text-amber-700">3</div>
          </div>
          <div className="stat">
            <span className="stat-k">Đang xử lý</span>
            <div className="stat-v">5</div>
          </div>
          <div className="stat">
            <span className="stat-k">Đã hoàn tiền</span>
            <div className="stat-v">112</div>
          </div>
          <div className="stat">
            <span className="stat-k">Từ chối</span>
            <div className="stat-v">9</div>
          </div>
        </div>
        <div className="mt-5 card overflow-hidden">
          <table className="tbl">
            <thead>
              <tr>
                <th>Mã YC</th>
                <th>Đơn gốc</th>
                <th>Khách hàng</th>
                <th>Lý do</th>
                <th>Loại</th>
                <th>Trạng thái</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono text-ink">RT-0048</td>
                <td className="font-mono text-[12px]">#DH-10285</td>
                <td>Đỗ Khánh Vy</td>
                <td className="text-[12px]">Sách bị lỗi in</td>
                <td><span className="bdg bdg-blue">Hoàn tiền</span></td>
                <td><span className="bdg bdg-amber">Chờ xử lý</span></td>
                <td className="text-right">
                  <div className="flex justify-end gap-1">
                    <button className="btn-soft rounded-md px-2 py-1 text-[11px] text-ok hover:border-ok hover:text-ok">
                      <Check className="text-[12px]" />
                    </button>
                    <button className="btn-soft rounded-md px-2 py-1 text-[11px] text-accent hover:border-accent hover:text-accent">
                      <X className="text-[12px]" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="font-mono text-ink">RT-0047</td>
                <td className="font-mono text-[12px]">#DH-10260</td>
                <td>Lê Hoàng Nam</td>
                <td className="text-[12px]">Giao nhầm sách</td>
                <td><span className="bdg bdg-indigo">Đổi hàng</span></td>
                <td><span className="bdg bdg-blue">Đang xử lý</span></td>
                <td className="text-right">
                  <button className="icon-btn ml-auto h-8 w-8">
                    <Ellipsis className="text-[15px]" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="font-mono text-ink">RT-0046</td>
                <td className="font-mono text-[12px]">#DH-10241</td>
                <td>Trần Minh Anh</td>
                <td className="text-[12px]">Đổi ý</td>
                <td><span className="bdg bdg-blue">Hoàn tiền</span></td>
                <td><span className="bdg bdg-green">Đã hoàn tiền</span></td>
                <td className="text-right">
                  <button className="icon-btn ml-auto h-8 w-8">
                    <Ellipsis className="text-[15px]" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
