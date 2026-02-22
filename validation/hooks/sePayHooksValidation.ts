import { z } from "zod";

export const SePayHooksSchema = z.object({
  id: z.number(),
  gateway: z.string().min(1),
  transactionDate: z.string().min(1),
  accountNumber: z.string().min(1),
  code: z.string().nullable().optional(),
  content: z.string().min(1),
  transferType: z.string().min(1),
  transferAmount: z.number(),
  accumulated: z.number(),
  subAccount: z.string().nullable().optional(),
  referenceCode: z.string().min(1),
  description: z.string().min(1),
});

export type SePayHooksInput = z.infer<typeof SePayHooksSchema>;
