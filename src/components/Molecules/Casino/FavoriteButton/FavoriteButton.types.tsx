export interface FavoriteProps {
  isFavorite: boolean;
  isAuthenticated: boolean;
  isMobile?: boolean;
  isGameControl?: boolean;
  isFavoriteColor?: string;
  isNotFavoriteColor?: string;
  toggleFavorite: () => void;
}

export interface FavoriteContainerProps {
  isGameControl?: boolean;
}
