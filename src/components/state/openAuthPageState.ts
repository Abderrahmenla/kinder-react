import { atom } from 'recoil';

interface AuthPageState {
  open: boolean;
}

export const openAuthPageState = atom<AuthPageState>({
  key: 'openAuthPageState',
  default: { open: false }
});
