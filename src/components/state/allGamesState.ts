import { atom } from 'recoil';
import { CategoryGames } from '@/pages/api/casino/casinoTypes';

export const allGamesDataState = atom<CategoryGames | null>({
  key: 'allGamesDataState',
  default: null
});
