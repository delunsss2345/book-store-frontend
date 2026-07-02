"use client";

import { ModalType, useModalStore } from "@/features/modal";
import { useSupplierQuery } from "@/features/supplier/hooks/use-supplier-query";
import { LoadingLazy } from "@/src/components/common/LoadingLazy";
import { CircleCheck, CirclePause, Ellipsis, Plus, Search, Truck } from "lucide-react";

export default function SupplierDashboardClient() {
  const { data: items, isPending: isSupplierPending } = useSupplierQuery();
  const onOpen = useModalStore((state) => state.onOpen);
  
  if (isSupplierPending) return <LoadingLazy />;

  const totalCount = items?.items?.length || 0;
  const activeCount = items?.items?.filter(i => i.isActive)?.length || 0;
  const inactiveCount = totalCount - activeCount;

  return (
    <div className="min-w-0">
      <div className="topbar">
        <div className="searchbar max-w-md">
          <Search className="text-[15px]" />
          <input 
            type="text" 
            placeholder="Tìm nhà cung cấp…" 
            className="flex-1 bg-transparent border-0 outline-none min-w-0"
          />
        </div>
        <button 
          onClick={() => onOpen(ModalType.ADD_SUPPLIER)}
          className="ml-auto btn-ink rounded-lg px-3.5 py-2 text-[12.5px]"
        >
          <Plus className="h-4 w-4" /> Thêm nhà cung cấp
        </button>
      </div>
      
      <div className="page">
        <div>
          <p className="eyebrow">Quản lý nhà cung cấp</p>
          <h1 className="page-title mt-2">Danh sách nhà cung cấp</h1>
          <p className="page-sub">Giao diện quản lý hệ thống nhà cung cấp toàn quốc.</p>
        </div>
        
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="stat">
            <div className="flex items-center justify-between">
              <span className="stat-k">Tổng nhà cung cấp</span>
              <Truck className="text-ink-3 h-4 w-4" />
            </div>
            <div className="stat-v">{totalCount}</div>
          </div>
          <div className="stat">
            <div className="flex items-center justify-between">
              <span className="stat-k">Đang hoạt động</span>
              <CircleCheck className="text-ink-3 h-4 w-4" />
            </div>
            <div className="stat-v">{activeCount}</div>
          </div>
          <div className="stat">
            <div className="flex items-center justify-between">
              <span className="stat-k">Ngừng hoạt động</span>
              <CirclePause className="text-ink-3 h-4 w-4" />
            </div>
            <div className="stat-v">{inactiveCount}</div>
          </div>
        </div>
        
        <div className="mt-5 card overflow-hidden">
          <div className="px-5 py-4">
            <h4 className="display text-[18px] font-semibold text-ink">Dữ liệu hệ thống</h4>
          </div>
          <table className="tbl">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên nhà cung cấp</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items?.items && items?.items?.length > 0 ? (
                items?.items?.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-ink">NCC-{item.id.toString().padStart(3, '0')}</td>
                    <td className="font-semibold text-ink">{item.name}</td>
                    <td className="text-[12px] text-ink-3">{new Date(item.createdAt).toLocaleDateString("vi-VN")}</td>
                    <td>
                      {item.isActive ? (
                        <span className="bdg bdg-green">Hoạt động</span>
                      ) : (
                        <span className="bdg bdg-gray">Ngừng hoạt động</span>
                      )}
                    </td>
                    <td className="text-right">
                      <button className="icon-btn ml-auto h-8 w-8">
                        <Ellipsis className="text-[15px]" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-muted-foreground">
                    Chưa có dữ liệu để hiển thị.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
