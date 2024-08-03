import { PiqTransaction } from '@/hooks/types/payments/piqTransactions';
import { GetToastMessageResponse } from './PendingWithdrawals.types';

export const getToastMessage = (success: boolean): GetToastMessageResponse => ({
  message: success ? 'pendingWithdrawalDeletedSuccessMessage' : 'pendingWithdrawalDeletionFailed',
  type: success ? 'success' : 'error'
});

export const filterWithdrawalsById = (
  pendingWithdrawals: PiqTransaction[],
  transactionId: string
) => pendingWithdrawals?.filter((transaction) => transaction.transactionId !== transactionId);
