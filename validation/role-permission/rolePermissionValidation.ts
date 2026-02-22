import { z } from "zod";

export const CreateRolePermissionSchema = z.object({
  roleId: z.string().min(1, "roleId không được để trống"),
  permissionId: z.string().min(1, "permissionId không được để trống"),
});

export type CreateRolePermissionInput = z.infer<typeof CreateRolePermissionSchema>;
