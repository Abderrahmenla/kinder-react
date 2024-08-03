import { atom } from 'recoil';
import { SportsIdProps } from '../Templates/Sports/Sports.type';

export const sportsIdState = atom<SportsIdProps[]>({
  key: 'sportsIdState',
  default: []
});
