import { FormattedTransactionRecord } from '@/utils/getTransactions';

export interface TransactionRecord {
  numericId: number;
  id: string;
  rowNumber: number;
  status: string;
  createTime: string;
  type: number;
  amount: number;
  referenceObject: string;
  additionalDescription: string;
  balanceAfter: number;
  providerName: string;
  isCancellable: boolean;
  productId: number;
  paymentInstrumentName: string;
}

export interface TransactionTableProps {
  t: (key: string) => string;
  transactionData: FormattedTransactionRecord[];
}

export interface TransactionHeaderContainer {
  toggleTabState: (state: string) => void;
  t: (key: string) => string;
  isMobile: boolean;
}

export interface StatusColors {
  Pending: string;
  Approved: string;
  Unapproved: string;
  Declined: string;
}

export interface InitialFilteredTransactionData {
  deposits: FormattedTransactionRecord[];
  withdrawals: FormattedTransactionRecord[];
}
