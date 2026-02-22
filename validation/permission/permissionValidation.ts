import { z } from "zod";

export const CreatePermissionSchema = z.object({
  code: z.string().min(1, "Mã quyền không được để trống"),
  description: z.string().optional(),
  method: z.string().min(1, "Phương thức không được để trống"),
  pathPattern: z.string().min(1, "Đường dẫn không được để trống"),
  isActive: z.boolean().optional(),
});

export const UpdatePermissionSchema = z.object({
  code: z.string().optional(),
  description: z.string().optional(),
  method: z.string().optional(),
  pathPattern: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CreatePermissionInput = z.infer<typeof CreatePermissionSchema>;
export type UpdatePermissionInput = z.infer<typeof UpdatePermissionSchema>;
