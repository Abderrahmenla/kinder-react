import Cashier from '@/components/Molecules/Payment/Cashier/Cashier';
import { CashierMethod } from '@/components/Molecules/Payment/Cashier/Cashier.types';
import { CashierWrapper } from './Withdraw.styles';

const Withdraw = ({ hasPending }: { hasPending: boolean }) => (
  <CashierWrapper $hasPendingWithdrawals={hasPending}>
    <Cashier method={CashierMethod.withdrawal} />
  </CashierWrapper>
);

export default Withdraw;
