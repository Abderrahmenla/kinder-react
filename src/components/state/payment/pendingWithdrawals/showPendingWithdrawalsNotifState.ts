import { atom } from 'recoil';

export const showPendingWithdrawalsNotifState = atom<boolean>({
  key: 'showPendingWithdrawalsNotifState',
  default: false
});
