import { atom } from 'recoil';

interface OpenToggleState {
  toggle: string;
}

export const openToggleAuthState = atom<OpenToggleState>({
  key: 'openToggleState',
  default: { toggle: 'signin' }
});
