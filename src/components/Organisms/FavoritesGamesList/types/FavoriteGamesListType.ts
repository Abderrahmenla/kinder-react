import { FavoriteGame, SelectedGame } from '@/pages/api/casino/casinoTypes';
import React from 'react';

export interface FavoriteGamesListType {
  isFavorite: any;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedGame: React.Dispatch<React.SetStateAction<SelectedGame | null>>;
  toggleFavorite: (game: FavoriteGame) => void;
  favoriteGame: FavoriteGame;
  isAuthenticated: boolean;
  index: number;
}
