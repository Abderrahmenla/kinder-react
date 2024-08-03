import { atom } from 'recoil';
import { PlayerData } from '@/hooks/types';

export const playerState = atom<PlayerData | null>({
  key: 'playerState',
  default: null
});
