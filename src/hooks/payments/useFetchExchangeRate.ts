import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cryptoState } from '@/components/state/payment/cryptoState';
import { useLoader } from '@/hooks/useLoader';
import { currencyExchangeRateState } from '@/components/state/payment/currencyExchangeRateState';
import { apiClient } from 'src/services/clientAxios';

const GET_EXCHANGE_RATE = '/api/payment/channel/getExchangeRate?Currency=';
export const useFetchExchangeRate = () => {
  const currentCryptoState = useRecoilValue(cryptoState);
  const setExchangeRateState = useSetRecoilState(currencyExchangeRateState);
  const { isLoading, toggleLoader, loadingWrapper } = useLoader('coin');

  const fetchExchangeRate = async () => {
    const selectedCryptoCode = currentCryptoState.selectedCrypto?.code;
    toggleLoader(true);
    try {
      const response = await apiClient.get(`${GET_EXCHANGE_RATE}${selectedCryptoCode}`);
      setExchangeRateState(response.data);
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
    } finally {
      toggleLoader(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [currentCryptoState.selectedCrypto]);

  return {
    fetchExchangeRate,
    loadingWrapper,
    isLoading
  };
};
