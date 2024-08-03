import { Game } from '@/pages/api/casino/casinoTypes';

export interface GameSearchProps {
  filteredGames: Game[];
  isFavorite: any;
  toggleFavorite: (game: Game) => void;
  setModalState: any;
}
