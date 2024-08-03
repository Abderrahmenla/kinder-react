import { GameCategory } from '@/graphql/types/casinoLobbyTypes';
import { CategoryGames } from '@/pages/api/casino/casinoTypes';

export type GameCategoryIds = {
  mobileId: string | undefined;
  desktopId: string | undefined;
};

export interface GameCategoryProps {
  category?: GameCategory;
  gameCategoryIds?: GameCategoryIds;
  customCategoryName?: string;
}

export interface GetGameCategoryIdProps extends GameCategoryProps {
  isMobile: boolean;
}

export type FetchCategoryProps = {
  levelId: number;
  isMobile: boolean;
};

export type GetCategoryDataFromRecoilProps = {
  categoryId: string;
  categories: CategoryGames[];
};

export interface GetCategoryNameProps extends GameCategoryProps {
  selectedCategory: CategoryGames | undefined;
}

export type GetCategoryIconSrcProps = {
  categoryName?: string;
  category?: GameCategory;
};
