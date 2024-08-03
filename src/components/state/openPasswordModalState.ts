import { atom } from 'recoil';

interface AuthPageState {
  open: boolean;
}

export const openPasswordModalState = atom<AuthPageState>({
  key: 'openPasswordModalState',
  default: { open: false }
});
