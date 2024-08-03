import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { GameSelectionType, gameSelectionState } from '@/components/state/gameSelectionState';
import { openAuthPageState } from '@/components/state/openAuthPageState';
import { SearchModalState } from '@/components/state/openSearchModalState';
import {
  FavoriteGame,
  Game,
  GameSelection,
  SelectedGame,
  SwitchGame
} from '@/pages/api/casino/casinoTypes';
import { navigateToGamePage } from '@/utils/gameUtils';
import { useVerifyPlayer } from './useVerifyPlayer';

export const createGameSelection = (
  gameType: GameSelectionType,
  game: Game | SelectedGame | FavoriteGame
): GameSelection => {
  return {
    gameType,
    provider: 'productName' in game ? game.productName : game.product || '',
    gameName: 'name' in game ? game.name : game.gameName || ''
  } as GameSelection;
};

function useSwitchGame(isAuthenticated: boolean) {
  const router = useRouter();
  const setGameType = useSetRecoilState(gameSelectionState);
  const setOpenAuthState = useSetRecoilState(openAuthPageState);
  const [gameToNavigate, setGameToNavigate] = useState<GameSelection | null>(null);
  const { isSanctionedHandler } = useVerifyPlayer();

  const switchToGame = useCallback(
    async ({ gameSelection, showModal }: SwitchGame) => {
      const { gameType, provider, gameName } = gameSelection;

      setGameType(gameType as GameSelectionType);

      if (gameType === GameSelectionType.real && !isAuthenticated) {
        setOpenAuthState({ open: true });
        setGameToNavigate(gameSelection);
      } else {
        showModal?.({ open: false });
        setGameToNavigate(null);
        await navigateToGamePage(provider, gameName, router);
      }
    },
    [isAuthenticated, router, setGameType, setOpenAuthState]
  );

  const onClick = useCallback(
    (gameType: GameSelectionType) =>
      (
        game: Game | SelectedGame | FavoriteGame,
        setShowModal?: SetterOrUpdater<SearchModalState>
      ) => {
        const isSanctionedPlayer = isSanctionedHandler('game');
        if (!isSanctionedPlayer) {
          const gameSelection: GameSelection = createGameSelection(gameType, game);
          switchToGame({ gameSelection, showModal: setShowModal });
        }
      },
    [switchToGame, isSanctionedHandler]
  );

  const onClickPlayNow = useCallback(onClick(GameSelectionType.real), [onClick]);
  const onClickDemo = useCallback(onClick(GameSelectionType.demo), [onClick]);

  useEffect(() => {
    if (isAuthenticated && gameToNavigate) {
      switchToGame({ gameSelection: gameToNavigate });
    }
  }, [isAuthenticated, gameToNavigate]);

  return { onClickPlayNow, onClickDemo };
}

export default useSwitchGame;
