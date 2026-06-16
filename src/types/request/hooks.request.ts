export type SePayHooksDTO = {
  id: number;
  gateway: string;
  transactionDate: string;
  accountNumber: string;
  code?: string | null;
  content: string;
  transferType: string;
  transferAmount: number;
  accumulated: number;
  subAccount?: string | null;
  referenceCode: string;
  description: string;
};
