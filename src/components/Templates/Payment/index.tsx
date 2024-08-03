import dynamic from 'next/dynamic';
import { Dialog } from '@/components/Atoms/Dialog/Dialog';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from '@/hooks/useTranslations';
import {
  StyledPaymentDialogWrapper,
  paymentDialogBodyStyle,
  paymentDialogHeaderStyle
} from './Payment.styles';
import { PaymentModalProps } from './Payment.types';
import PaymentDialogHeader from './PaymentHeader';

const Wallet = dynamic(() => import('@/components/Organisms/Payment/Wallet/Wallet'));

const PaymentModal = ({ open, handleClosePayment }: PaymentModalProps) => {
  const isBelow768 = UseMediaQuery(768);
  const { t } = useTranslations();

  return (
    <StyledPaymentDialogWrapper $isMobile={isBelow768}>
      <Dialog
        open={open}
        onClose={() => handleClosePayment?.()}
        headerContent={() => <PaymentDialogHeader t={t} />}
        headerDivider
        bodyContent={() => <Wallet t={t} />}
        dialogHeaderStyle={paymentDialogHeaderStyle}
        dialogBodyStyle={paymentDialogBodyStyle}
      />
    </StyledPaymentDialogWrapper>
  );
};

export default PaymentModal;
