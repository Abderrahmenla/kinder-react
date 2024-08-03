import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { apiClient } from 'src/services/clientAxios';
import { useLoader } from '@/hooks/useLoader';
import { cryptoState } from '@/components/state/payment/cryptoState';
import { SUPPORTED_CRYPTOS } from '@/constants/index';

const GET_CRYPTO_CURRENCIES = '/api/payment/channel/getCryptoCurrencies';
const GET_CHANNELS = '/api/payment/channel/getChannels';
const POST_CHANNEL = '/api/payment/channel/postChannel';

export const useGetCryptos = () => {
  const [cryptoData, setCryptoData] = useRecoilState(cryptoState);
  const { isLoading, toggleLoader, loadingWrapper } = useLoader('coin');

  const createChannel = async (
    crypto?: string,
    network?: string | undefined | null
  ): Promise<void> => {
    toggleLoader(true);
    try {
      const cryptoResponse = await apiClient.post(POST_CHANNEL, {
        payCurrency: crypto,
        network: network
      });

      setCryptoData((prevState) => ({
        ...prevState,
        selectedChannel: cryptoResponse?.data
      }));
    } catch (error) {
      setCryptoData((prevState) => ({
        ...prevState,
        selectedChannel: null
      }));
      console.error('Failed to fetch data:', error);
    } finally {
      toggleLoader(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      toggleLoader(true);
      try {
        const cryptoResponse = apiClient.get(GET_CRYPTO_CURRENCIES);
        const channelsResponse = apiClient.get(GET_CHANNELS);
        const [cryptoData, channelsData] = await Promise.all([cryptoResponse, channelsResponse]);
        const supportedCryptos = SUPPORTED_CRYPTOS;
        const filteredCryptos = cryptoData.data.filter((crypto: any) =>
          supportedCryptos.includes(crypto?.code)
        );
        const sortedCryptos = [...filteredCryptos].sort(
          (a: any, b: any) => supportedCryptos.indexOf(a.code) - supportedCryptos.indexOf(b.code)
        );

        setCryptoData((prevState) => ({
          ...prevState,
          cryptoListState: sortedCryptos,
          channels: channelsData.data
        }));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        toggleLoader(false);
      }
    };

    fetchData();
  }, []);

  return {
    cryptos: cryptoData.cryptoListState,
    channels: cryptoData.channels,
    createChannel,
    isLoading,
    loadingWrapper
  };
};
