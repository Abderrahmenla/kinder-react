import { SelectedGame } from '@/pages/api/casino/casinoTypes';

export interface GamePopupProps {
  selectedGame: SelectedGame | null;
  isMobile: boolean;
  isAuthenticated: boolean;
  isFavorite: any;
  isGameModal?: boolean;
  open: boolean;
  handleCloseModal: () => void;
  toggleFavorite: (game: SelectedGame | undefined) => void;
}
