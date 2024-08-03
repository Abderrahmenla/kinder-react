import { atom } from 'recoil';

interface PaymentPageState {
  open: boolean;
}

export const openPaymentPageState = atom<PaymentPageState>({
  key: 'openPaymentPageState',
  default: { open: false }
});
