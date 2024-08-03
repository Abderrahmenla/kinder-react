import { CategoryGames, Game, SelectedGame } from '@/pages/api/casino/casinoTypes';
import React from 'react';

export interface CategoryGamesListType {
  isFavorite: any;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedGame: React.Dispatch<React.SetStateAction<SelectedGame | null>>;
  toggleFavorite: (game: Game) => void;
  isAuthenticated: boolean;
  handleShowMore: () => void;
  gameLimit: any;
  item: CategoryGames;
}
