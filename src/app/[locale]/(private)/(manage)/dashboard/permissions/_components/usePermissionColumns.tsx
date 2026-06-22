import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { PermissionItemData } from "@/types/response/permission.response";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

const getMethodColor = (method: string) => {
  switch (method.toUpperCase()) {
    case "GET":
      return "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20";
    case "POST":
      return "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20";
    case "PUT":
    case "PATCH":
      return "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20";
    case "DELETE":
      return "bg-red-500/10 text-red-600 hover:bg-red-500/20";
    default:
      return "bg-slate-500/10 text-slate-600 hover:bg-slate-500/20";
  }
};

export const usePermissionColumns = (t: any): ColumnDef<PermissionItemData>[] => {
  return [
    {
      accessorKey: "code",
      header: t("dashboard.permissions.table.columns.code"),
      cell: ({ row }) => <span className="font-medium text-foreground">{row.original.code}</span>,
    },
    {
      accessorKey: "method",
      header: t("dashboard.permissions.table.columns.method"),
      cell: ({ row }) => {
        const method = row.original.method || "GET";
        return (
          <Badge className={`shadow-none font-mono ${getMethodColor(method)}`}>
            {method.toUpperCase()}
          </Badge>
        );
      },
    },
    {
      accessorKey: "pathPattern",
      header: t("dashboard.permissions.table.columns.pathPattern"),
      cell: ({ row }) => (
        <span className="font-mono text-sm text-slate-600 dark:text-slate-400">
          {row.original.pathPattern}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: t("dashboard.permissions.table.columns.description"),
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.description || "—"}</span>,
    },
    {
      accessorKey: "isActive",
      header: t("dashboard.permissions.table.columns.status"),
      cell: ({ row }) => {
        const isActive = row.original.isActive;
        return (
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? t("dashboard.permissions.table.status.active") : t("dashboard.permissions.table.status.inactive")}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: t("dashboard.permissions.table.columns.actions"),
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("dashboard.permissions.actions.label")}</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {}}>
                <Edit className="mr-2 h-4 w-4" />
                {t("dashboard.permissions.actions.edit")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}} className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                {t("dashboard.permissions.actions.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
