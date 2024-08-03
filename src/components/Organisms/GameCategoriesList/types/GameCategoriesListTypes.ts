import { CategoryGames, Game, Providers, SelectedGame } from '@/pages/api/casino/casinoTypes';
import React from 'react';
import { GameCategory } from '@/graphql/types/casinoLobbyTypes';

export interface GameListProps {
  categoryGames: CategoryGames[];
  selectedCategory: string;
  isAuthenticated: boolean;
  isFavorite: any;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedGame: React.Dispatch<React.SetStateAction<SelectedGame | null>>;
  providers: Providers[];
  toggleFavorite: (game: Game) => void;
  casinoCategoriesData: GameCategory[];
}
