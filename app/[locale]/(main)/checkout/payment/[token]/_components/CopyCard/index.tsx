import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

type CopyCardProps = {
  label: string;
  value: string;
  subValue?: string;
  onCopy: () => void;
  isCopied: boolean;
  mono?: boolean;
};

export function CopyCard({
  label,
  value,
  subValue,
  onCopy,
  isCopied,
  mono = false,
}: CopyCardProps) {
  return (
    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 group hover:border-blue-200 dark:hover:border-blue-900 transition-all relative">
      <span className="text-[10px] uppercase text-zinc-400 font-bold block mb-1">
        {label}
      </span>

      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span
            className={`text-sm font-bold leading-none block truncate ${
              mono ? "font-mono tracking-wider" : ""
            }`}
          >
            {value}
          </span>

          {subValue ? (
            <span className="text-[10px] text-zinc-500 block mt-1 truncate">
              {subValue}
            </span>
          ) : null}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onCopy}
          className="h-8 w-8 text-zinc-400 hover:text-blue-600 shrink-0"
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
