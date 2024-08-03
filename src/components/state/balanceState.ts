import { Account } from '@/pages/api/player/getBalanceTypes';
import { atom } from 'recoil';

export const balanceState = atom<Account[]>({
  key: 'balanceState',
  default: []
});
