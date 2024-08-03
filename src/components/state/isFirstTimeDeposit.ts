import { atom } from 'recoil';

export const firstTimeDepState = atom({
  key: 'isFirstTimeDeposit',
  default: false
});
