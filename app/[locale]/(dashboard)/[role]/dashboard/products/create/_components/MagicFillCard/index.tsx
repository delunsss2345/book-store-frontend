"use client";
import { Sparkles, Hash, Search, Languages } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const MagicFillCard = ({
  onScan,
  isPending,
}: {
  onScan: (isbn: string, lang: string) => void;
  isPending: boolean;
}) => {
  const [isbn, setIsbn] = useState("");
  const [lang, setLang] = useState("vi");
  return (
    <Card className="border-primary/20 bg-primary/5 shadow-none border-2 border-dashed">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Label className="text-primary font-bold flex items-center gap-2">
            <Sparkles className="size-4" /> NHẬP ISBN ĐỂ ĐIỀN NHANH (MAGIC FILL)
          </Label>

          <div className="flex flex-col md:flex-row gap-3 items-stretch">
            <div className="w-full md:w-[160px]">
              <Select defaultValue="vi">
                <SelectTrigger className="h-12 bg-white border-primary/10">
                  <Languages className="size-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Ngôn ngữ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem onChange={() => setLang("vi")} value="vi">
                    Tiếng Việt
                  </SelectItem>
                  <SelectItem onChange={() => setLang("en")} value="en">
                    English
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative flex-1">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                disabled={isPending}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="Ví dụ: 9780135398548"
                className="pl-10 h-12 bg-white text-lg font-mono shadow-sm"
              />
            </div>

            <Button
              disabled={isPending}
              onClick={() => onScan(isbn, lang)}
              size="lg"
              className="h-12 px-8 shadow-md group"
            >
              <Search className="size-4 mr-2 group-hover:scale-110 transition-transform" />
              Quét dữ liệu
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
