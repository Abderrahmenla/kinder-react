import { atom } from 'recoil';

export const rakebackState = atom<{
  currency: string;
  balance: number;
}>({
  key: 'rakebackRedeemedBalance',
  default: {
    currency: '',
    balance: 0
  }
});
