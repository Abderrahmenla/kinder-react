import styled from '@emotion/styled';
import {
  CASHIER_MARGIN_TOP,
  SWITCHER_HEIGHT,
  WITHDRAWAL_HEIGHT_WITH_PENDING
} from '@/components/Templates/Payment/Payment.constants';

export const CashierWrapper = styled.div<{
  $hasPendingWithdrawals: boolean;
}>(({ $hasPendingWithdrawals }) => ({
  width: '100%',
  marginTop: CASHIER_MARGIN_TOP,
  overflowY: 'hidden',
  height: `calc(
    100% - ${
      $hasPendingWithdrawals ? WITHDRAWAL_HEIGHT_WITH_PENDING : SWITCHER_HEIGHT + CASHIER_MARGIN_TOP
    }px
  ) !important`
}));
