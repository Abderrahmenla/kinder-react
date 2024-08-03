import React, { FC } from 'react';
import { CardsMainContainer } from '@/components/Molecules/Payment/Deposit/CurrencyCard/CurrencyCardStyle';
import CurrencyCard from '@/components/Molecules/Payment/Deposit/CurrencyCard';
import { assets } from '@/config/assets';
import { useGetPlayer } from '@/hooks/useGetPlayer';
import { ActiveWallet } from '@/state/payment/activeWalletState';
import { CryptoImg } from './Crypto/CryptoStyle';
import { DepositMethodsProps } from './DepositMethods.types';

const DepositMethods: FC<DepositMethodsProps> = ({ onClick }) => {
  const { player } = useGetPlayer();

  return (
    <CardsMainContainer>
      <CurrencyCard
        onClick={() => onClick(ActiveWallet.fiat)}
        logoComponent={() => (
          <CryptoImg src={`${assets}/images/payment/coin.svg`} alt="bank logo" loading="lazy" />
        )}
        label={player?.currencyCode || ''}
      />
      <CurrencyCard
        onClick={() => onClick(ActiveWallet.crypto)}
        logoComponent={() => (
          <CryptoImg
            src={`${assets}/images/payment/crypto-logo.svg`}
            alt="crypto logo"
            loading="lazy"
          />
        )}
        label="Crypto"
      />
    </CardsMainContainer>
  );
};

export default DepositMethods;
