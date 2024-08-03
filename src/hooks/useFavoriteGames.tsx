import { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';
import { favoriteGamesState } from '@/components/state/favoriteGamesState';
import { ErrorResponse } from '@/hooks/useAuthenticationForm';
import { FavoriteGame, Game, SelectedGame } from '@/pages/api/casino/casinoTypes';
import { apiClient } from '@/services/clientAxios';
import { logFetchError } from '@/utils/logFetchError';

interface UseFavoriteGames {
  favoriteGames: FavoriteGame[];
  toggleFavorite: (game: Game | SelectedGame | FavoriteGame | undefined) => void;
  isFavorite: (externalId?: string) => boolean;
}

export const fetchFavoriteGames = async (): Promise<FavoriteGame[] | undefined> => {
  try {
    const timestamp = new Date().getTime();
    const res = await apiClient.get(
      `/api/handle-favorites/checkFavoriteStatus?timestamp=${timestamp}`
    );
    return res.data;
  } catch (error) {
    logFetchError(error as AxiosError<ErrorResponse>);
    return;
  }
};

export const createFavoriteGame = (game: Game | SelectedGame | FavoriteGame): FavoriteGame => {
  return {
    id: 'id' in game ? game.id : '',
    gameExternalId:
      'gameExternalId' in game
        ? game.gameExternalId
        : 'externalId' in game
        ? game.externalId
        : 'gameId' in game
        ? game.gameId || ''
        : '',
    gameName: 'name' in game ? game.name : game.gameName || '',
    product: 'productName' in game ? game.productName : game.product || ''
  } as FavoriteGame;
};

export const deleteOrAddFavoriteGame = async (
  isAlreadyFavorite: boolean,
  externalId: string
): Promise<void> => {
  if (isAlreadyFavorite) {
    await apiClient.delete(`/api/handle-favorites/${externalId}`);
  } else {
    await apiClient.put(`/api/add-favorites/${externalId}`);
  }
};

const sortFavoriteGamesByName = (games: FavoriteGame[]) => {
  return [...games].sort((a, b) => {
    const aName = a.gameName || '';
    const bName = b.gameName || '';

    return aName.localeCompare(bName);
  });
};

const deepCopyMap = (originalMap: Map<string, FavoriteGame>) => {
  const newMap = new Map();

  for (const [key, value] of originalMap) {
    if (value instanceof Map) {
      newMap.set(key, deepCopyMap(value));
    } else {
      newMap.set(key, value);
    }
  }

  return newMap;
};

const setFavoriteGamesInLocalStorage = (favoritesMap: Map<string, FavoriteGame>) => {
  localStorage.setItem('favoriteGames', JSON.stringify(Array.from(favoritesMap.entries())));
};

export const useFavoriteGames = (): UseFavoriteGames => {
  const { isAuthenticated } = useRecoilValue(authState);
  const [favoriteGamesMap, setFavoriteGamesMap] =
    useRecoilState<Map<string, FavoriteGame>>(favoriteGamesState);

  const handleFetchFavoriteGames = useCallback(async (): Promise<void> => {
    const favorites: FavoriteGame[] | undefined = await fetchFavoriteGames();
    if (favorites) {
      const favoritesMap = new Map(
        favorites.map((favorite) => [favorite.gameExternalId || '', favorite])
      );

      setFavoriteGamesInLocalStorage(favoritesMap);
      setFavoriteGamesMap(favoritesMap);
    }
  }, [setFavoriteGamesMap]);

  const isFavorite = useCallback(
    (externalId?: string): boolean => {
      if (!externalId) return false;
      return favoriteGamesMap.has(externalId);
    },
    [favoriteGamesMap]
  );

  const handleLocalFavoriteGames = useCallback(
    (isAlreadyFavorite: boolean, game: FavoriteGame) => {
      setFavoriteGamesMap((currentFavorites) => {
        const updatedFavorites = deepCopyMap(currentFavorites);

        if (isAlreadyFavorite) {
          /* eslint-disable no-console */
          console.info('- FAVORITE: ', game.gameExternalId, game.gameName, game);
          updatedFavorites.delete(game.gameExternalId ?? '');
        } else {
          /* eslint-disable no-console */
          console.info('+ FAVORITE: ', game.gameExternalId, game.gameName, game);
          updatedFavorites.set(game.gameExternalId ?? '', game);
        }

        setFavoriteGamesInLocalStorage(updatedFavorites);
        return updatedFavorites;
      });
    },
    [setFavoriteGamesMap]
  );

  const handleToggleFavorite = useCallback(
    async (game: FavoriteGame): Promise<void> => {
      if (!game.gameExternalId) {
        console.error('gameExternalId is null or undefined:', game);
        return;
      }

      try {
        const isAlreadyFavorite: boolean = isFavorite(game.gameExternalId);
        handleLocalFavoriteGames(isAlreadyFavorite, game);
        await deleteOrAddFavoriteGame(isAlreadyFavorite, game.gameExternalId ?? '');
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        logFetchError(axiosError);
      }
    },
    [favoriteGamesMap, isFavorite, setFavoriteGamesMap]
  );

  const toggleFavorite = useCallback(
    (game: Game | SelectedGame | FavoriteGame | undefined): void => {
      if (game) {
        const favoriteGame = createFavoriteGame(game);
        handleToggleFavorite(favoriteGame);
      }
    },
    [handleToggleFavorite]
  );

  const favoriteGames = useMemo(
    () => sortFavoriteGamesByName(Array.from(favoriteGamesMap.values())),
    [favoriteGamesMap]
  );

  useEffect(() => {
    if (isAuthenticated) {
      const storedFavorites = localStorage.getItem('favoriteGames');

      if (storedFavorites) {
        const parsedFavorites: Map<string, FavoriteGame> = new Map(JSON.parse(storedFavorites));
        setFavoriteGamesMap(parsedFavorites);
      } else {
        handleFetchFavoriteGames();
      }
    } else {
      localStorage.removeItem('favoriteGames');
      setFavoriteGamesMap(new Map());
    }
  }, [isAuthenticated]);

  return { favoriteGames, toggleFavorite, isFavorite };
};
