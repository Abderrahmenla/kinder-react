import Image from 'next/image';
import { assets } from '@/config/assets';
import { ArrowContainer, ArrowLabel, ArrowLogoContainer } from './PaymentBackButton.styles';

type PaymentBackButtonType = {
  label: string;
  onClick: () => void;
};

const PaymentBackButton = ({ label, onClick }: PaymentBackButtonType) => (
  <ArrowContainer>
    <ArrowLogoContainer onClick={onClick}>
      <Image
        src={`${assets}/images/payment/arrow-logo.svg`}
        alt="Back button icon"
        width={16}
        height={16}
        loading="lazy"
      />
    </ArrowLogoContainer>
    <ArrowLabel size="b2" type="Body" color="var(--white)">
      {label}
    </ArrowLabel>
  </ArrowContainer>
);

export default PaymentBackButton;
