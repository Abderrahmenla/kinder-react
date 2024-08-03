import { atom } from 'recoil';
import { FavoriteGame } from '@/pages/api/casino/casinoTypes';

export const recentGamesState = atom<Map<string, FavoriteGame>>({
  key: 'recentGamesState',
  default: new Map()
});
