import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';
import { SearchModalState } from '@/components/state/openSearchModalState';

export type CategoryGames = {
  id: string;
  name: string;
  category: string;
  category_name: string;
  gameMains: Game[];
  productName: string;
  externalId: string;
};

export type FavoriteGames = {
  id?: string;
  games?: FavoriteGame[];
  gameExternalId?: string;
};

export type Game = {
  id: string;
  externalId: string;
  name: string;
  imgUrl: string;
  productName: string;
  demoPlayRestricted?: boolean;
  maintenanceModeEnabled?: boolean;
  realPlayRestricted?: boolean;
  gameExternalId?: string;
  gameId?: string;
};

export type FavoriteGame = {
  id: string;
  gameExternalId?: string;
  product?: string;
  gameName?: string;
};

export type GameType = {
  id: string;
  location: string;
  productName: string;
};

export type Category = {
  id: string;
  Name: string;
  name?: string;
  description: string | null;
  Slug: string;
  Icon: IconType;
};

export type IconType = {
  data: {
    attributes: {
      url: string;
    };
  };
};

export type Categories = {
  id: string;
  name: string;
  gameCategoryList: Category[];
};

export type Providers = {
  id: string;
  name: string;
  provider: SingleProvider[];
};

export type SingleProvider = {
  productName: string;
  id: string;
  name: string;
  Name?: string;
};

export type SelectedGame = {
  gameId?: string;
  gameName: string;
  imageUrl: string;
  productName: string;
};

export interface GameSearchProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  filteredGames: Game[];
  isFavorite?: { [key: string]: boolean };
  handleFetchFavoriteGames?: () => void;
  setModalState?: Dispatch<SetStateAction<boolean>>;
  onSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type GameSelection = {
  gameType: 'real' | 'demo';
  provider: string;
  gameName: string;
};

export type SwitchGame = {
  gameSelection: GameSelection;
  showModal?: SetterOrUpdater<SearchModalState> | undefined;
};

export type RecommendedGamesProps = {
  recommendedGames?: CategoryGames;
};
