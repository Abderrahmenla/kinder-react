import { atom } from 'recoil';

export const easterIsFirstTimeDeposit = atom<undefined | boolean>({
  key: 'easterIsFirstTimeDeposit',
  default: undefined
});
