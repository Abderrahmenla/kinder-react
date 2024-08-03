import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';
import { GameSelectionType, gameSelectionState } from '@/components/state/gameSelectionState';
import { Game, GameType } from '@/pages/api/casino/casinoTypes';
import { ErrorResponse } from '@/pages/api/types';
import { apiClient } from '@/services/clientAxios';
import { useGameStatusContext } from 'src/providers/GameStatusProvider';

interface UseLaunchGameProps {
  selectedGame: Game | undefined;
  setGame: React.Dispatch<React.SetStateAction<GameType | undefined>>;
  setGameError: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLoader: (loading: boolean) => void;
}

interface LaunchGamePayload {
  extGameId?: string;
  portalId: string;
  isNative: boolean;
  language?: string;
  realPlay?: boolean;
}

const createPayload = (extGameId?: string, isRealPlay?: boolean): LaunchGamePayload => ({
  extGameId,
  portalId: '1',
  isNative: true,
  language: 'en-US',
  realPlay: isRealPlay
});

const handleAxiosError = (
  error: any,
  setGameError: React.Dispatch<React.SetStateAction<boolean>>,
  isReal: boolean,
  handleToggleIsPlaying: any
) => {
  const axiosError = error as AxiosError<ErrorResponse>;
  if (axiosError.response) {
    setGameError(true);
    if (isReal) {
      handleToggleIsPlaying({ status: false });
    }
  }
};

function useLaunchGame({ selectedGame, setGame, setGameError, toggleLoader }: UseLaunchGameProps) {
  const { isAuthenticated } = useRecoilValue(authState);
  const gameType = useRecoilValue(gameSelectionState);
  const { handleToggleIsPlaying } = useGameStatusContext();
  const [isRealGame, setIsRealGame] = useState(false);
  const [defaultGameToggleState, setDefaultGameToggleState] = useState<boolean>(false);

  const launchGame = useCallback(
    async (endpoint: string, payload: LaunchGamePayload, isReal: boolean) => {
      if (selectedGame && selectedGame.externalId) {
        try {
          const res = await apiClient.post(endpoint, payload);
          setGame(res.data);
          if (isReal) {
            handleToggleIsPlaying({ status: true });
          }
        } catch (error) {
          handleAxiosError(error, setGameError, isReal, handleToggleIsPlaying);
        } finally {
          toggleLoader(false);
        }
      }
    },
    [selectedGame, setGame, setGameError, toggleLoader, handleToggleIsPlaying]
  );

  const launchRealGame = useCallback(async () => {
    const payload = createPayload(selectedGame?.externalId, true);
    await launchGame('/api/real-game', payload, true);
  }, [launchGame]);

  const launchDemoGame = useCallback(async () => {
    const payload = createPayload(selectedGame?.externalId, false);
    await launchGame('/api/demo-game', payload, false);
  }, [launchGame]);

  const handleGameTypeToggle = useCallback(() => {
    setIsRealGame((currentValue) => !currentValue);
  }, [setIsRealGame]);

  useEffect(() => {
    if (selectedGame && isRealGame) {
      launchRealGame();
    } else if (selectedGame) {
      launchDemoGame();
    }
  }, [isRealGame, selectedGame]);

  useEffect(() => {
    if (isAuthenticated && gameType === GameSelectionType.demo) {
      setIsRealGame(false);
      setDefaultGameToggleState(false);
    } else if (isAuthenticated) {
      setIsRealGame(true);
      setDefaultGameToggleState(true);
    }
  }, [isAuthenticated, gameType]);

  return {
    isRealGame,
    defaultGameToggleState,
    handleGameTypeToggle
  };
}

export default useLaunchGame;
