import { atom } from 'recoil';

export const enum GameSelectionType {
  real = 'real',
  demo = 'demo'
}

export const gameSelectionState = atom({
  key: 'gameSelectionState',
  default: GameSelectionType.real
});
