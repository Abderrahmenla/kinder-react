export interface PiqTransaction {
  transactionId: string;
  created: string;
  state: string;
  amount: string;
  fee: string;
  txAmount: string;
  txType: string;
  accountId: string;
  continueLink: string | null;
  pspService: string | null;
}

export interface PiqTransactionsResponse {
  merchantId: number;
  userId: string;
  success: boolean;
  transactions: PiqTransaction[];
}
