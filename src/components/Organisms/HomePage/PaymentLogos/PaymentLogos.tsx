import { LogoImageProps } from '@/components/Templates/Home/Homepage.type';
import Image from 'next/image';
import React from 'react';
import { PaymentLogosContainer } from './PaymentLogos.style';

const PaymentLogos: React.FC<{ logos: LogoImageProps[] }> = ({ logos }) => {
  return (
    <div>
      <PaymentLogosContainer>
        {logos &&
          logos.map((logo, index) => {
            return (
              <Image
                key={index}
                src={logo.Image.data.attributes.url}
                width={54}
                height={54}
                alt={`logo-${index}`}
              />
            );
          })}
      </PaymentLogosContainer>
    </div>
  );
};
const MemoizedPaymentLogos = React.memo(PaymentLogos);
export default MemoizedPaymentLogos;
