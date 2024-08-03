import { atom } from 'recoil';

export const activeMenuItemState = atom<string | null>({
  key: 'activeMenuItemState',
  default: null
});
