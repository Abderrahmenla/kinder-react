import { atom } from 'recoil';

export const errorMessageState = atom<boolean>({
  key: 'errorMessageState',
  default: false
});
