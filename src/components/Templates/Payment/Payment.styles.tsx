import { CSSProperties } from 'react';
import styled from '@emotion/styled';
import Typography from '@/components/Atoms/Typography/Typography';
import {
  DESKTOP_DIALOG_HEIGHT,
  DESKTOP_DIALOG_WIDTH,
  HEADER_HEIGHT,
  MOBILE_NAV_HEIGHT,
  PAYMENT_HEIGHT
} from './Payment.constants';

export const StyledHeading = styled(Typography)({
  fontWeight: 600
});

export const paymentDialogHeaderStyle: CSSProperties = {
  height: HEADER_HEIGHT
};

export const paymentDialogBodyStyle: CSSProperties = {
  padding: '8px',
  height: `calc(100% - ${HEADER_HEIGHT}px)`
};

export const StyledPaymentDialogWrapper = styled('div')(
  ({ $isMobile }: { $isMobile?: boolean }) => ({
    '& .dialog-wrapper': {
      height: $isMobile ? `calc(100vh - ${MOBILE_NAV_HEIGHT}px)` : DESKTOP_DIALOG_HEIGHT,
      width: $isMobile ? '100vw' : DESKTOP_DIALOG_WIDTH,
      top: $isMobile ? '-30px' : 'unset',
      overflow: 'hidden'
    }
  })
);

export const PaymentContentScrollbar = styled.div`
  height: ${`calc(100% - ${PAYMENT_HEIGHT}px)`};
  width: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
