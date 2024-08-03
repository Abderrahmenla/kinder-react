import { atom } from 'recoil';
import { PiqTransaction } from '@/hooks/types/payments/piqTransactions';

export const pendingWithdrawalsState = atom<PiqTransaction[]>({
  key: 'pendingWithdrawalsState',
  default: []
});
