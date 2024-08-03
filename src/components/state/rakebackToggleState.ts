import { atom } from 'recoil';

export const rakebackToggleState = atom<boolean>({
  key: 'rakebackToggleState',
  default: false
});
