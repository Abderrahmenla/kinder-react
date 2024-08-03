import { atom } from 'recoil';
import { GameCategory } from '@/graphql/types/casinoLobbyTypes';

export const casinoCategoriesState = atom<GameCategory[]>({
  key: 'casinoCategoriesState',
  default: []
});
