import { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';
import { recentGamesState } from '@/components/state/recentGames';
import { ErrorResponse } from '@/hooks/useAuthenticationForm';
import { FavoriteGame } from '@/pages/api/casino/casinoTypes';
import { apiClient } from '@/services/clientAxios';
import { logFetchError } from '@/utils/logFetchError';

interface UseRecentGames {
  recentGames: FavoriteGame[];
}

export const fetchRecentGames = async (isMobile: boolean): Promise<FavoriteGame[] | undefined> => {
  try {
    const res = await apiClient.get('/api/casino/prod-game/recent', {
      params: {
        portalId: isMobile ? 2 : 1,
        count: 10
      }
    });
    return res.data;
  } catch (error) {
    logFetchError(error as AxiosError<ErrorResponse>);
    return;
  }
};

const sortRecentGamesByName = (games: FavoriteGame[]) => {
  return [...games].sort((a, b) => {
    const aName = a.gameName || '';
    const bName = b.gameName || '';

    return aName.localeCompare(bName);
  });
};

const setRecentGamesInLocalStorage = (recentMap: Map<string, FavoriteGame>) => {
  localStorage.setItem('recentGames', JSON.stringify(Array.from(recentMap.entries())));
};

export const useRecentGames = (isMobile: boolean): UseRecentGames => {
  const { isAuthenticated } = useRecoilValue(authState);
  const [recentGamesMap, setRecentGamesMap] =
    useRecoilState<Map<string, FavoriteGame>>(recentGamesState);

  const handleFetchRecentGames = useCallback(async (): Promise<void> => {
    const recentGames: FavoriteGame[] | undefined = await fetchRecentGames(isMobile);
    if (recentGames) {
      const recentMap = new Map(
        recentGames.map((favorite) => [favorite.gameExternalId || '', favorite])
      );

      setRecentGamesInLocalStorage(recentMap);
      setRecentGamesMap(recentMap);
    }
  }, [setRecentGamesMap]);

  const recentGames = useMemo(
    () => sortRecentGamesByName(Array.from(recentGamesMap.values())),
    [recentGamesMap]
  );

  useEffect(() => {
    if (isAuthenticated) {
      const storedFavorites = localStorage.getItem('recentGames');

      if (storedFavorites) {
        const parsedFavorites: Map<string, FavoriteGame> = new Map(JSON.parse(storedFavorites));
        setRecentGamesMap(parsedFavorites);
      } else {
        handleFetchRecentGames();
      }
    } else {
      localStorage.removeItem('recentGames');
      setRecentGamesMap(new Map());
    }
  }, [isAuthenticated]);

  return { recentGames };
};
