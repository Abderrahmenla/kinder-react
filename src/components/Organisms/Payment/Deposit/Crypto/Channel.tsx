import React, { lazy, Suspense } from 'react';
import { useRecoilState } from 'recoil';
import { ChannelContainer } from './ChannelStyle';
import { cryptoState, Crypto } from '@/components/state/payment/cryptoState';
import { useGetCryptos } from '@/hooks/payments/useGetCryptos';
import { useFetchExchangeRate } from '@/hooks/payments/useFetchExchangeRate';

const ChannelDropDown = lazy(() => import('./ChannelDropDown'));
const ChannelCryptoAddress = lazy(() => import('./ChannelCryptoAddress'));
const ChannelExchangeCurrency = lazy(() => import('./ChannelExchangeCurrency'));

const ChannelComponent: React.FC = () => {
  const { createChannel, isLoading, loadingWrapper } = useGetCryptos();

  const { fetchExchangeRate } = useFetchExchangeRate();

  const [{ selectedCrypto, cryptoListState, selectedChannel, channels }, setCryptoData] =
    useRecoilState(cryptoState);

  const handleCryptoClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: Crypto
  ) => {
    e.preventDefault();
    setCryptoData((data) => ({
      ...data,
      selectedCrypto: item
    }));
    const network = item.protocols && item.protocols.length > 0 ? item.protocols[0].code : '';
    const selectedChannel = channels.find((channel) => item.code === channel.payCurrency);
    if (!selectedChannel) {
      await createChannel(item.code, network);
    } else {
      setCryptoData((prevState) => ({
        ...prevState,
        selectedChannel
      }));
    }
    await fetchExchangeRate();
  };

  return (
    <Suspense fallback={loadingWrapper}>
      <ChannelContainer>
        <ChannelDropDown
          dropdownItems={cryptoListState}
          activeItem={{ image: selectedCrypto.icon, label: selectedCrypto.code }}
          handleItemClick={handleCryptoClick}
        />

        {isLoading ? (
          loadingWrapper
        ) : (
          <ChannelCryptoAddress selectedCrypto={selectedCrypto} selectedChannel={selectedChannel} />
        )}

        <ChannelExchangeCurrency selectedCrypto={selectedCrypto} />
      </ChannelContainer>
    </Suspense>
  );
};

export default ChannelComponent;
