import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useCreateSupplierMutation } from "@/features/supplier/hooks/use-create-supplier-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createSupplierSchema,
  CreateSupplierValues,
} from "@/validation/supplier/supplier.validation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ModalAddSupplierProps {
  onClose: () => void;
}

const ModalAddSupplier = ({ onClose }: ModalAddSupplierProps) => {
  const { mutate: createSupplier, isPending: isCreatingSupplier } =
    useCreateSupplierMutation();

  const form = useForm<CreateSupplierValues>({
    resolver: zodResolver(createSupplierSchema),
    defaultValues: {
      code: "",
      name: "",
      isActive: true,
    },
  });
  const handleCreateSupplier = (data: CreateSupplierValues) => {
    if (data.isActive) {
      createSupplier(data);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateSupplier)}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-xl font-semibold">Thêm nhà cung cấp mới</h2>
          <p className="text-sm text-muted-foreground">
            Vui lòng nhập đầy đủ thông tin mã và tên nhà cung cấp.
          </p>
        </div>

        {/* Code */}
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mã nhà cung cấp</FormLabel>
              <FormControl>
                <Input
                  placeholder="VD: NCC001"
                  className="rounded-xl h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên nhà cung cấp</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tên đơn vị"
                  className="rounded-xl h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* isActive */}
        <FormField
          control={form.control}
          defaultValue={true}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-2xl border p-4 bg-muted/30">
              <div className="space-y-1">
                <FormLabel className="text-sm font-semibold">
                  Trạng thái hoạt động
                </FormLabel>
                <p className="text-xs text-muted-foreground">
                  Bật để kích hoạt NCC ngay lập tức.
                </p>
              </div>

              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Hủy
          </Button>

          <Button type="submit" disabled={isCreatingSupplier}>
            {isCreatingSupplier ? "Đang tạo..." : "Lưu nhà cung cấp"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ModalAddSupplier;
