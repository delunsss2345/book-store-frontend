"use client";

import { usePermissionsQuery } from "@/features/permission/hooks/use-permissions-query";
import useTranslator from "@/hooks/use-translator";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import type { PermissionItemData } from "@/types/response/permission.response";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Filter, Plus, Search } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import PermissionsTableSkeleton from "./PermissionsTableSkeleton";
import { usePermissionColumns } from "./usePermissionColumns";
import { useRouter } from "next/navigation";

export function PermissionsDashboardClient() {
  const { t } = useTranslator();

  const {
    data: permissions = [] as PermissionItemData[],
    error: permissionsError,
    isPending,
  } = usePermissionsQuery();

  const router = useRouter();

  useEffect(() => {
    if (permissionsError) toast.error(permissionsError.message);
  }, [permissionsError]);

  const columns = usePermissionColumns(t);

  const table = useReactTable({
    data: permissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t("dashboard.permissions.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("dashboard.permissions.description")}
          </p>
        </div>
        <Button
          onClick={() => router.push("permissions/create")}
          className="w-fit gap-2 bg-slate-950 hover:bg-slate-800 text-white shadow-md transition-all"
        >
          <Plus className="size-4" /> {t("dashboard.permissions.addNew")}
        </Button>
      </div>

      {/* Main Table Card */}
      <Card className="admin-table-card">
        <CardHeader className="admin-table-toolbar">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-lg font-semibold">{t("dashboard.permissions.listTitle")}</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder={t("dashboard.permissions.searchPlaceholder")}
                  className="pl-9 w-full md:w-[300px] bg-background h-9 shadow-none"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                <Filter className="size-4" /> {t("dashboard.permissions.filter")}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="admin-table-header">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="admin-table-head"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isPending ? (
                <PermissionsTableSkeleton />
              ) : table && table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="admin-table-row"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="admin-table-cell">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center text-muted-foreground"
                  >
                    {t("dashboard.permissions.table.empty")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
