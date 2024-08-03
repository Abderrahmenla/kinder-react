import Cashier from '@/components/Molecules/Payment/Cashier/Cashier';
import { CashierMethod } from '@/components/Molecules/Payment/Cashier/Cashier.types';
import PaymentBackButton from '@/components/Molecules/Payment/PaymentBackButton/PaymentBackButton';
import { PaymentContentScrollbar } from '@/components/Templates/Payment/Payment.styles';
import { FiatCashierWrapper } from './Fiat.styles';

export const Fiat = ({ onClickBack }: { onClickBack: () => void }) => (
  <>
    <PaymentBackButton label="Fiat" onClick={onClickBack} />
    <PaymentContentScrollbar>
      <FiatCashierWrapper>
        <Cashier method={CashierMethod.deposit} />
      </FiatCashierWrapper>
    </PaymentContentScrollbar>
  </>
);

export default Fiat;
