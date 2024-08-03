import Typography from '@/components/Atoms/Typography/Typography';
import { assets } from '@/config/assets';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/index';
import { useSetRecoilState } from 'recoil';
import { openPaymentPageState } from '@/components/state/openPaymentPageState';
import { useTranslations } from '@/hooks/useTranslations';
import {
  DepositRequiredModalContainer,
  DepositRequiredModalIcon,
  DepositRequiredModalWrapper
} from '@/components/Molecules/Easter/EasterModals/EasterModal.styles';

const DepositRequiredModal: React.FC = () => {
  const { t } = useTranslations();
  const setOpenPayment = useSetRecoilState(openPaymentPageState);

  return (
    <DepositRequiredModalContainer>
      <DepositRequiredModalWrapper>
        <DepositRequiredModalIcon>
          <Image src={`${assets}/images/easter-coins.svg`} alt="Coins" width={20} height={18} />
        </DepositRequiredModalIcon>
        <Typography type="Heading" size="h4" color="var(--white)">
          {t('deposit')}
        </Typography>
        <Typography size="p1" type="Paragraph" color="var(--white)">
          {t('easterParticipationDescription')}
        </Typography>
        <Button
          handleClick={() =>
            setOpenPayment({
              open: true
            })
          }
        >
          {t('depositNow')}
        </Button>
      </DepositRequiredModalWrapper>
    </DepositRequiredModalContainer>
  );
};

export default DepositRequiredModal;
