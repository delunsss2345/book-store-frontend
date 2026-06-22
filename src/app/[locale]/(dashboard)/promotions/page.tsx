import { Ellipsis, Plus, Search } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function PromotionsPage() {
  const t = await getTranslations();

  return (
    <div className="min-w-0">
      <div className="topbar">
        <div className="searchbar max-w-md">
          <Search className="text-[15px]" />
          <input 
            type="text" 
            placeholder="Tìm mã khuyến mãi…" 
            className="flex-1 bg-transparent border-0 outline-none min-w-0"
          />
        </div>
        <button className="ml-auto btn-ink rounded-lg px-3.5 py-2 text-[12.5px]">
          <Plus className="h-4 w-4" /> Tạo khuyến mãi
        </button>
      </div>
      <div className="page">
        <div>
          <h1 className="page-title">Khuyến mãi</h1>
          <p className="page-sub">Tạo và theo dõi mã giảm giá, chương trình ưu đãi.</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="stat">
            <span className="stat-k">Đang chạy</span>
            <div className="stat-v">6</div>
          </div>
          <div className="stat">
            <span className="stat-k">Lượt dùng tháng</span>
            <div className="stat-v">1.842</div>
          </div>
          <div className="stat">
            <span className="stat-k">Giá trị giảm</span>
            <div className="stat-v">38,4tr</div>
          </div>
          <div className="stat">
            <span className="stat-k">Sắp hết hạn</span>
            <div className="stat-v text-accent">2</div>
          </div>
        </div>
        <div className="mt-5 card overflow-hidden">
          <table className="tbl">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Loại</th>
                <th>Giá trị</th>
                <th>Đã dùng</th>
                <th>Hiệu lực</th>
                <th>Trạng thái</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono text-ink">SUMMER25</td>
                <td>Theo %</td>
                <td className="font-semibold text-ink">-25%</td>
                <td>412 / 1000</td>
                <td className="text-[12px]">01/06 – 30/06</td>
                <td><span className="bdg bdg-green">Đang chạy</span></td>
                <td className="text-right">
                  <button className="icon-btn ml-auto h-8 w-8">
                    <Ellipsis className="text-[15px]" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="font-mono text-ink">FREESHIP</td>
                <td>Miễn ship</td>
                <td className="font-semibold text-ink">-30k</td>
                <td>980 / 2000</td>
                <td className="text-[12px]">10/06 – 25/06</td>
                <td><span className="bdg bdg-amber">Sắp hết hạn</span></td>
                <td className="text-right">
                  <button className="icon-btn ml-auto h-8 w-8">
                    <Ellipsis className="text-[15px]" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="font-mono text-ink">WELCOME50</td>
                <td>Cố định</td>
                <td className="font-semibold text-ink">-50k</td>
                <td>231 / 500</td>
                <td className="text-[12px]">Không giới hạn</td>
                <td><span className="bdg bdg-green">Đang chạy</span></td>
                <td className="text-right">
                  <button className="icon-btn ml-auto h-8 w-8">
                    <Ellipsis className="text-[15px]" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="font-mono text-ink">TET2026</td>
                <td>Theo %</td>
                <td className="font-semibold text-ink">-15%</td>
                <td>0 / 3000</td>
                <td className="text-[12px]">01/02 – 15/02</td>
                <td><span className="bdg bdg-gray">Đã kết thúc</span></td>
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
