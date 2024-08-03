import React from 'react';
import CurrencyCard from '@/components/Molecules/Payment/Deposit/CurrencyCard';
import { CryptoImg, CryptoListContainer } from './CryptoStyle';
import { useSetRecoilState } from 'recoil';
import { cryptoState, Crypto } from '@/components/state/payment/cryptoState';
import { useGetCryptos } from '@/hooks/payments/useGetCryptos';

const CryptoItemList: React.FC = () => {
  const { isLoading, cryptos, loadingWrapper, channels, createChannel } = useGetCryptos();
  const setCryptoData = useSetRecoilState(cryptoState);

  const handleCardClick = async (selectedCrypto: Crypto) => {
    const selectedChannel = channels.find((item) => selectedCrypto.code === item.payCurrency);

    const network =
      selectedCrypto.protocols && selectedCrypto.protocols.length > 0
        ? selectedCrypto.protocols[0].code
        : '';
    if (!selectedChannel) {
      await createChannel(selectedCrypto.code, network);
    } else {
      setCryptoData((prevState) => ({
        ...prevState,
        selectedChannel
      }));
    }

    setCryptoData((prevState) => ({
      ...prevState,
      selectedCrypto
    }));
  };

  return (
    <CryptoListContainer>
      {isLoading ? (
        loadingWrapper
      ) : (
        <>
          {cryptos?.map((crypto) => (
            <CurrencyCard
              key={crypto?.id}
              label={crypto?.name || ''}
              logoComponent={() => (
                <CryptoImg src={crypto?.icon || ''} alt={crypto?.name || ''} loading="lazy" />
              )}
              onClick={() => handleCardClick(crypto)}
            />
          ))}
        </>
      )}
    </CryptoListContainer>
  );
};

export default CryptoItemList;
