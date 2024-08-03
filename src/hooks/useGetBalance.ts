import { Account } from '@/pages/api/player/getBalanceTypes';
import { useEffect, useCallback } from 'react';
import { apiClient } from 'src/services/clientAxios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';
import { balanceState } from '@/components/state/balanceState';

export function useAccountBalance() {
  const { isAuthenticated } = useRecoilValue(authState);
  const [data, setData] = useRecoilState(balanceState);

  const getBalance = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }
    try {
      const response = await apiClient.get<{ accounts: Account[] }>('/api/player/getBalance');
      setData(response.data.accounts);
    } catch (error) {
      console.error(error);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getBalance();
  }, [getBalance, isAuthenticated]);

  return { data, refresh: getBalance };
}
