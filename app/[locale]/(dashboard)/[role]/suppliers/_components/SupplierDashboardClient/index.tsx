"use client";
import React, { useEffect, useState } from "react";
import { Plus, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useSupplierQuery } from "@/features/supplier/hooks/use-supplier-query";
import { LoadingLazy } from "@/components/common/LoadingLazy";
import { ModalType, useModalStore } from "@/features/modal";

export default function SupplierDashboardClient() {
  const { data: items, isPending: isSupplierPending } = useSupplierQuery();
  const onOpen = useModalStore((state) => state.onOpen);
  if (isSupplierPending) return <LoadingLazy />;
  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="mx-auto grid gap-6">
        <div className="flex flex-col gap-4 rounded-3xl border bg-background p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              <span>Quản lý nhà cung cấp</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Danh sách nhà cung cấp
            </h1>
            <p className="text-sm text-muted-foreground">
              Giao diện quản lý hệ thống nhà cung cấp toàn quốc.
            </p>
          </div>

          <Button
            onClick={() => onOpen(ModalType.ADD_SUPPLIER)}
            size="lg"
            className="rounded-2xl"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm nhà cung cấp
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {["Tổng nhà cung cấp", "Đang hoạt động", "Ngừng hoạt động"].map(
            (title, index) => (
              <Card
                key={index}
                className="rounded-3xl shadow-sm border-none bg-background"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold">0</div>
                </CardContent>
              </Card>
            ),
          )}
        </div>

        <Card className="rounded-3xl shadow-sm border-none bg-background">
          <CardHeader>
            <CardTitle>Dữ liệu hệ thống</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[150px]">Mã</TableHead>
                    <TableHead>Tên nhà cung cấp</TableHead>
                    <TableHead className="w-[200px]">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items?.items && items?.items?.length > 0 ? (
                    items?.items?.map((item) => {
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            {item.isActive ? (
                              <Badge variant="default">Hoạt động</Badge>
                            ) : (
                              <Badge variant="destructive">
                                Ngừng hoạt động
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="py-20 text-center text-muted-foreground"
                      >
                        Chưa có dữ liệu để hiển thị.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <Separator className="my-6" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
