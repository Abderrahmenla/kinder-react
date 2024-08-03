import { atom } from 'recoil';

// Define a transaction
interface TransactionRecord {
  numericId: number;
  id: string;
  rowNumber: number;
  status: number;
  createTime: string;
  type: number;
  amount: number;
  referenceObject: string;
  additionalDescription: string;
  balanceAfter: number;
  providerName: string;
  isCancellable: boolean;
  productId: number;
}

interface FormattedTransactionRecord extends Omit<TransactionRecord, 'status' | 'type'> {
  status: string;
  type: string;
}

// Define the Recoil state
export const transactionsState = atom<TransactionRecord[]>({
  key: 'transactionsState', // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
});

export const formattedTransactionsState = atom<FormattedTransactionRecord[]>({
  key: 'formattedTransactionsState',
  default: []
});
