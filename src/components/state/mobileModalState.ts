import { atom } from 'recoil';

export const mobileModalState = atom<boolean>({
  key: 'mobileModalState',
  default: false
});
