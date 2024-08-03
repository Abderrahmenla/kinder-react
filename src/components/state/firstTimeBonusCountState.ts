import { atom } from 'recoil';

export const firstTimeBonusCountState = atom<number>({
  key: 'firstTimeBonusCountState',
  default: 0
});
