import Image from 'next/image';
import React from 'react';
import { assets } from '@/config/assets';
import { StyledHeading } from './Payment.styles';
import { PaymentHeader } from './Payment.types';

const PaymentDialogHeader = ({ t }: PaymentHeader) => {
  return (
    <>
      <Image
        src={`${assets}/images/payment/wallet-icon.svg`}
        alt="Wallet icon"
        width={24}
        height={24}
        loading="lazy"
      />
      <StyledHeading size="b2" type="Heading" color="var(--white)">
        {t('wallet')}
      </StyledHeading>
    </>
  );
};

export default PaymentDialogHeader;
