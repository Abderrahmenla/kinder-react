import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  ChannelLabel,
  ChannelCurrencyExchangeContainer,
  ChannelCurrencyExchangeSection,
  ChannelCurrencyExchange,
  ExchangeLogoContainer
} from './ChannelStyle';
import { Crypto } from '@/components/state/payment/cryptoState';
import { useFetchExchangeRate } from '@/hooks/payments/useFetchExchangeRate';
import { currencyExchangeRateState } from '@/components/state/payment/currencyExchangeRateState';
import { Icon } from '@/components/Atoms/DropDown';
import { assets } from '@/config/assets';
import Image from 'next/image';
import { playerState } from '@/components/state/playerState';

const currencySymbols: Record<string, string> = {
  CAD: 'C$',
  NZD: 'NZ$',
  EUR: '€',
  USD: '$'
};
export const ChannelExchangeCurrency = ({ selectedCrypto }: { selectedCrypto: Crypto }) => {
  const { isLoading: isLoadingExchange, loadingWrapper: loadingWrapperExchange } =
    useFetchExchangeRate();
  const exchangeRate = useRecoilValue(currencyExchangeRateState);
  const player = useRecoilValue(playerState);
  return (
    <ChannelCurrencyExchangeContainer>
      <ChannelCurrencyExchangeSection>
        <ChannelLabel size="b3">Deposit value in {player?.currencyCode} </ChannelLabel>
        <ChannelCurrencyExchange>
          <ChannelLabel size="b3">
            {`${currencySymbols[player?.currencyCode || '']} 1.00`}{' '}
          </ChannelLabel>
        </ChannelCurrencyExchange>
      </ChannelCurrencyExchangeSection>
      <ChannelCurrencyExchangeSection>
        <ExchangeLogoContainer>
          <Image
            src={`${assets}/images/payment/exchange-logo.svg`}
            alt="exchange-logo"
            width={24}
            height={24}
            loading="lazy"
          />
        </ExchangeLogoContainer>
      </ChannelCurrencyExchangeSection>
      <ChannelCurrencyExchangeSection>
        <ChannelLabel size="b3">Deposit value in {selectedCrypto.code} </ChannelLabel>
        <ChannelCurrencyExchange>
          <Icon src={selectedCrypto.icon} rounded />
          <ChannelLabel size="b3">
            {isLoadingExchange ? loadingWrapperExchange : exchangeRate.rate}
          </ChannelLabel>
        </ChannelCurrencyExchange>
      </ChannelCurrencyExchangeSection>
    </ChannelCurrencyExchangeContainer>
  );
};

export default ChannelExchangeCurrency;
