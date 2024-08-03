import { atom } from 'recoil';

export const openProfileState = atom<boolean>({
  key: 'openProfileState',
  default: false
});
