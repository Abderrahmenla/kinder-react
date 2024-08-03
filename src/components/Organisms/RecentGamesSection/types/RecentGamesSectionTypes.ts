import { FavoriteGames, SelectedGame } from '@/pages/api/casino/casinoTypes';

export interface RecentSectionProps {
  recentGames: FavoriteGames[];
  selectedCategory: string;
  setModalState: any;
  setSelectedGame: React.Dispatch<React.SetStateAction<SelectedGame | null>>;
}
