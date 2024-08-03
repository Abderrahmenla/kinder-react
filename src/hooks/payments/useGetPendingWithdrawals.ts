import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { pendingWithdrawalsState } from '@/state/payment/pendingWithdrawals/pendingWithdrawalsState';
import { showPendingWithdrawalsNotifState } from '@/state/payment/pendingWithdrawals/showPendingWithdrawalsNotifState';
import { PiqTransactionStatus } from '@/hooks/constants/payments/piqTransactions';
import { PiqTransactionsResponse, PiqTransaction } from '@/hooks/types/payments/piqTransactions';
import { useLoader } from '@/hooks/useLoader';
import { ErrorResponse } from 'src/pages/api/types';
import { logFetchError } from '@/utils/logFetchError';

export const useGetPendingWithdrawals = () => {
  const { isLoading: arePendingWithdrawalsLoading, toggleLoader } = useLoader('coin');
  const [pendingWithdrawals, setPendingWithdrawals] =
    useRecoilState<PiqTransaction[]>(pendingWithdrawalsState);
  const [showPendingWithdrawalsNotif, setShowPendingWithdrawalsNotif] = useRecoilState<boolean>(
    showPendingWithdrawalsNotifState
  );

  const fetchPendingWithdrawals = useCallback(async () => {
    try {
      toggleLoader(true);
      const response: PiqTransactionsResponse = await fetch('/api/all-transactions').then((res) =>
        res.json()
      );

      const filteredWithdrawals = response?.transactions?.filter(
        (transaction: PiqTransaction) => transaction.state === PiqTransactionStatus.waitingApproval
      );

      setPendingWithdrawals(filteredWithdrawals);
      if (filteredWithdrawals.length > 0 && !showPendingWithdrawalsNotif) {
        setShowPendingWithdrawalsNotif(true);
      }
    } catch (error) {
      logFetchError(error as AxiosError<ErrorResponse>);
    } finally {
      toggleLoader(false);
    }
  }, [setPendingWithdrawals]);

  return {
    pendingWithdrawals,
    setPendingWithdrawals,
    fetchPendingWithdrawals,
    showPendingWithdrawalsNotif,
    arePendingWithdrawalsLoading
  };
};
