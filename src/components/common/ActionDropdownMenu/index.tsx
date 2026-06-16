import { cn } from "@/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { LucideIcon, MoreVertical } from "lucide-react";
import { ReactNode } from "react";

interface DropdownItem {
  label: string;
  icon?: LucideIcon; // Cho phép truyền component icon từ lucide
  onClick: () => void;
  variant?: "default" | "destructive";
  showSeparator?: boolean; // Hiện vạch kẻ phía trên item này
}

interface ActionDropdownProps {
  label?: string;
  triggerIcon?: ReactNode;
  items: DropdownItem[];
}

export function ActionDropdown({
  label = "Actions",
  triggerIcon = <MoreVertical className="size-4" />,
  items,
}: ActionDropdownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          {triggerIcon}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}

        {items.map((item, index) => (
          <div key={index}>
            {item.showSeparator && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={item.onClick}
              className={cn(
                "cursor-pointer",
                item.variant === "destructive" &&
                "text-destructive focus:bg-destructive focus:text-destructive-foreground",
              )}
            >
              {item.icon && <item.icon className="mr-2 size-4" />}
              {item.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
