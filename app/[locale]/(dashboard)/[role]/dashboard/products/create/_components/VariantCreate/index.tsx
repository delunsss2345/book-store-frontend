"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, X, Check, Package } from "lucide-react";

import { AdminBookVariant } from "@/types/response/admin.response";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VariantItem from "./VariantItem";

const adminBookVariantSchema = z.object({
  format: z
    .enum(["PAPERBACK", "HARDCOVER", "EBOOK", "AUDIOBOOK"])
    .or(z.string()),
  edition: z.number(), // <- đảm bảo number (coerce từ string input)
  isbn: z.string().min(1, "ISBN không được để trống"),
  costPrice: z.string().min(1, "Giá nhập không được để trống"),
  price: z.string().min(1, "Giá bán không được để trống"),
  currencyCode: z.string().min(1, "Mã tiền tệ không được để trống"),
  stock: z.number(), // <- number
  isActive: z.boolean(),
});

type AdminBookVariantForm = z.infer<typeof adminBookVariantSchema>;

export default function VariantCreate({
  variants,
  setVariants,
}: {
  variants: AdminBookVariant[];
  setVariants: (variants: AdminBookVariant[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<AdminBookVariantForm>({
    resolver: zodResolver(adminBookVariantSchema),
    defaultValues: {
      format: "PAPERBACK",
      edition: 1,
      stock: 50,
      isActive: true,
      currencyCode: "VND",
    },
  });

  const onSaveVariant = (data: AdminBookVariantForm) => {
    if (variants) {
      const newVariant: AdminBookVariant = {
        id: crypto.randomUUID(),
        ...data,
      };
      setVariants([...variants, newVariant]);
      setIsOpen(false);
      form.reset();
    }
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
    <div className="space-y-4">
      {/* DANH SÁCH CÁC KHỐI VARIANT ĐÃ THÊM */}
      <div className="space-y-3">
        {variants &&
          variants.map((v) => (
            <VariantItem
              key={v.id}
              v={v}
              setVariants={setVariants}
              variants={variants}
            />
          ))}
      </div>

      {!isOpen ? (
        <Button
          variant="outline"
          className="w-full h-20 border-dashed border-2 text-muted-foreground hover:text-emerald-600 hover:border-emerald-600 transition-all"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="mr-2 size-5" /> Thêm biến thể mới
        </Button>
      ) : (
        <Card className="border-emerald-200 bg-emerald-50/10">
          <CardContent className="p-6">
            <Form {...form}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Định dạng</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            <SelectItem value="PAPERBACK">Bìa mềm</SelectItem>
                            <SelectItem value="HARDCOVER">Bìa cứng</SelectItem>
                            <SelectItem value="EBOOK">E-Book</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tồn kho</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isbn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mã ISBN</FormLabel>
                        <FormControl>
                          <Input placeholder="978..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="costPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá nhập</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-emerald-600 font-bold">
                          Giá bán
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="border-emerald-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="edition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tái bản lần</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* NÚT ĐIỀU KHIỂN */}
                <div className="flex justify-end gap-3 border-t pt-4">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      form.reset();
                    }}
                  >
                    <X className="mr-2 size-4" /> Huỷ
                  </Button>
                  <Button
                    type="button"
                    onClick={form.handleSubmit(onSaveVariant, onError)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Check className="mr-2 size-4" /> Lưu biến thể
                  </Button>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
