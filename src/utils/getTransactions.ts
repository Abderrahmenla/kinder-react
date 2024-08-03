import { format, subYears } from 'date-fns';
import { apiClient } from 'src/services/clientAxios';

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
  paymentInstrumentName: string;
}

interface TransactionRecordsResponse {
  transactions: TransactionRecord[];
  recordcount: number;
  recordsLimitExceeded: boolean;
}

interface RequestBody {
  withManualTransactions: boolean;
  retrieveChildTransactions: boolean;
  fromDate: string;
  toDate: string;
  pageSize: number;
  pageNumber: number;
}

const defaultTransactionData: RequestBody = {
  withManualTransactions: true,
  retrieveChildTransactions: true,
  fromDate: '2022-07-17T20:12:18.5750875+00:00',
  toDate: '2023-07-18T20:12:18.5751238+00:00',
  pageSize: 1000,
  pageNumber: 1
};

enum TransactionStatus {
  Pending = 1,
  Declined = 2,
  Approved = 3,
  Cancelled = 4,
  Paid = 5,
  Refunded = 6,
  ChargedBack = 7,
  ChargeBackReversed = 8,
  Returned = 9,
  ReturnReversed = 10,
  Completed = 12,
  ErrorOrTimeout = 13
}

enum TransactionType {
  Deposit = 1,
  Withdrawal = 2
}

export interface FormattedTransactionRecord extends Omit<TransactionRecord, 'status' | 'type'> {
  status: string;
  type: string;
}

export const getTransactions = async (transactionData: Partial<RequestBody> = {}) => {
  const transactionsState = [] as TransactionRecord[];
  const formattedTransactions = [] as FormattedTransactionRecord[];
  let filteredTransactions = [] as FormattedTransactionRecord[];
  let isEnd = false;
  let page = 1;

  const today = new Date();
  const oneYearAgo = subYears(today, 1);

  const isoFormatToday = format(today, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  const isoFormatOneYearAgo = format(oneYearAgo, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

  while (!isEnd) {
    try {
      const response = await apiClient.post<TransactionRecordsResponse>(
        'api/balance/transactions',
        {
          ...defaultTransactionData,
          ...transactionData,
          pageNumber: page,
          fromDate: isoFormatOneYearAgo,
          toDate: isoFormatToday
        }
      );

      if (
        response.data.transactions.length < defaultTransactionData.pageSize ||
        response.data.recordsLimitExceeded
      ) {
        isEnd = true;
      } else {
        page++;
      }

      transactionsState.push(...response.data.transactions);

      // Convert transaction status and type into their string representations
      const newFormattedTransactions: FormattedTransactionRecord[] = response.data.transactions.map(
        (transaction) => ({
          ...transaction,
          status: TransactionStatus[transaction.status],
          type: TransactionType[transaction.type]
        })
      );

      formattedTransactions.push(...newFormattedTransactions);

      filteredTransactions = formattedTransactions.filter(
        (transaction) =>
          transaction.type === 'Deposit' && ['Approved', 'Pending'].includes(transaction.status)
      );
    } catch (error: any) {
      console.error(error);
    }
  }

  return { transactionsState, formattedTransactions, filteredTransactions, isEnd };
};
