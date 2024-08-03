import { FavoriteGame, FavoriteGames, SelectedGame } from '@/pages/api/casino/casinoTypes';
import React from 'react';

export interface FavoritesSectionProps {
  favoriteGames: FavoriteGames[];
  isFavorite: any;
  selectedCategory: string;
  toggleFavorite: (game: FavoriteGame) => void;
  setModalState: any;
  setSelectedGame: React.Dispatch<React.SetStateAction<SelectedGame | null>>;
}
