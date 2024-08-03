import { atom } from 'recoil';
import { FavoriteGame } from '@/pages/api/casino/casinoTypes';

export const favoriteGamesState = atom<Map<string, FavoriteGame>>({
  key: 'favoriteGamesState',
  default: new Map()
});
