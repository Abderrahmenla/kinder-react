import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useFavoriteGames } from './useFavoriteGames';
import { useLoader } from './useLoader';
import useSwitchGame from './useSwitchGame';
import { allGamesDataState } from '@/components/state/allGamesState';
import { openSearchModalState } from '@/components/state/openSearchModalState';
import { GameSelectionType } from '@/components/state/gameSelectionState';
import { fetchAllGamesCategory, navigateToGamePage, searchGames } from '@/utils/gameUtils';
import { logFetchError } from '@/utils/loginFetchError';
import { CategoryGames, FavoriteGame, Game, SelectedGame } from '@/pages/api/casino/casinoTypes';
import { ErrorResponse } from '@/pages/api/types';
import { authState } from '@/components/state/isAuthenticated';

interface UseSearchModal {
  isMobile?: boolean;
  standalone?: boolean;
}

export const useSearchModal = ({ isMobile }: UseSearchModal) => {
  const router = useRouter();
  const { isAuthenticated } = useRecoilValue(authState);

  const [allGames, setAllGames] = useRecoilState<CategoryGames | null>(allGamesDataState);
  const openSearchModal = useRecoilValue(openSearchModalState);
  const setShowModal = useSetRecoilState(openSearchModalState);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [gameSelection, setGameSelection] = useState<any>(null);

  const { isFavorite, toggleFavorite } = useFavoriteGames();
  const { onClickPlayNow, onClickDemo } = useSwitchGame(isAuthenticated);
  const { toggleLoader, isLoading } = useLoader('coin');

  const handleFetchAllGames = useCallback(async () => {
    try {
      const response = await fetchAllGamesCategory(!!isMobile);

      if (response.data && response.data.length > 0) {
        setAllGames(response.data[0]);
      } else {
        throw new Error('Error in fetching All Games category');
      }
    } catch (error) {
      logFetchError(error as AxiosError<ErrorResponse>);
    }
  }, [isMobile, setAllGames]);

  const handleSearch = useCallback(
    async (searchKey?: string) => {
      if (allGames && searchKey) {
        const searchResults = searchGames(allGames, searchKey);
        setFilteredGames(searchResults);
        toggleLoader(false);
      }
    },
    [allGames, setFilteredGames, toggleLoader]
  );

  const handleGameSwitch = useCallback(
    (gameType: GameSelectionType, game: Game | SelectedGame | FavoriteGame) => {
      const action = gameType === GameSelectionType.real ? onClickPlayNow : onClickDemo;
      action(game, setShowModal);
    },
    [onClickPlayNow, onClickDemo, setShowModal]
  );

  useEffect(() => {
    handleFetchAllGames();
  }, []);

  useEffect(() => {
    if (openSearchModal.open) {
      if (!allGames) {
        toggleLoader(true);
      } else if (allGames && searchQuery.length > 2) {
        handleSearch(searchQuery);
      }
    }
  }, [openSearchModal.open, allGames]);

  useEffect(() => {
    if (!openSearchModal.open) {
      setSearchQuery('');
      setFilteredGames([]);
    }
  }, [openSearchModal.open]);

  useEffect(() => {
    if (isAuthenticated && gameSelection) {
      const { provider, gameName } = gameSelection;
      navigateToGamePage(provider, gameName, router);
      setGameSelection(null);
    }
  }, [isAuthenticated, gameSelection]);

  return {
    toggleFavorite,
    handleGameSwitch,
    handleFetchAllGames,
    handleSearch,
    isLoading,
    searchQuery,
    setSearchQuery,
    filteredGames,
    isFavorite,
    allGames
  };
};
