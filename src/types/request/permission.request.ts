export type CreatePermissionDTO = {
  code: string;
  description?: string;
  method: string;
  pathPattern: string;
  isActive?: boolean;
};

export type UpdatePermissionDTO = {
  code?: string;
  description?: string;
  method?: string;
  pathPattern?: string;
  isActive?: boolean;
};
