import { atom } from 'recoil';
import { CategoryGames } from '@/pages/api/casino/casinoTypes';

export const lobbyDataState = atom<CategoryGames[]>({
  key: 'lobbyDataState',
  default: []
});
