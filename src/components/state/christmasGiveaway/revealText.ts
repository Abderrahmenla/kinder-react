import { atom } from 'recoil';

export const revealTextState = atom<string>({
  key: 'revealTextState',
  default: 'Reveal'
});
