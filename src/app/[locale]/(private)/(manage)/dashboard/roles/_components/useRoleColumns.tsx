import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { RoleData } from "@/types/response/role.response";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

export const useRoleColumns = (t: any): ColumnDef<RoleData>[] => {
  return [
    {
      accessorKey: "id",
      header: t("dashboard.roles.table.columns.id"),
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.id}</span>,
    },
    {
      accessorKey: "code",
      header: t("dashboard.roles.table.columns.code"),
      cell: ({ row }) => <span className="font-medium text-foreground">{row.original.code}</span>,
    },
    {
      accessorKey: "name",
      header: t("dashboard.roles.table.columns.name"),
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      accessorKey: "description",
      header: t("dashboard.roles.table.columns.description"),
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.description || "—"}</span>,
    },
    {
      accessorKey: "isActive",
      header: t("dashboard.roles.table.columns.status"),
      cell: ({ row }) => {
        const isActive = row.original.isActive;
        return (
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? t("dashboard.roles.table.status.active") : t("dashboard.roles.table.status.inactive")}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: t("dashboard.roles.table.columns.actions"),
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
              <DropdownMenuLabel>{t("dashboard.roles.actions.label")}</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {}}>
                <Edit className="mr-2 h-4 w-4" />
                {t("dashboard.roles.actions.edit")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}} className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                {t("dashboard.roles.actions.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
