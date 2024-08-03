import { atom } from 'recoil';

export interface SearchModalState {
  open: boolean;
}

export const openSearchModalState = atom<SearchModalState>({
  key: 'openSearchModalState',
  default: { open: false }
});
