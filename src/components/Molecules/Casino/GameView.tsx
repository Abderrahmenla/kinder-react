import React, { FC, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GameFrame } from '@/components/Atoms/GameFrame/GameFrame';
import UniboOverlay from '@/components/Atoms/UniboOverlay/UniboOverlay';
import Typography from '@/components/Atoms/Typography/Typography';
import FormGroupButton from '@/components/Molecules/Auth/FormButton';
import {
  GameContainer,
  GameDetail,
  RealGameInfo
} from '@/components/Molecules/Casino/Casino.styles';
import Authenticationpage from '@/components/Templates/AuthenticationPage/AuthenticationPage';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from '@/hooks/useTranslations';
import { Game, GameType } from '@/pages/api/casino/casinoTypes';
import { authState } from '@/state/isAuthenticated';
import { openAuthPageState } from '@/state/openAuthPageState';

export type GameViewProps = {
  isFullScreen: boolean;
  isRealGame: boolean;
  selectedGame?: Game;
  gameType: GameType;
};

const GameView: FC<GameViewProps> = ({ isFullScreen, isRealGame, selectedGame, gameType }) => {
  const isMobile = UseMediaQuery(576);
  const { isAuthenticated } = useRecoilValue(authState);
  const setOpenAuth = useSetRecoilState(openAuthPageState);
  const { t } = useTranslations();

  const renderGameFrame = useCallback(
    () => (
      <GameFrame
        key={`${selectedGame?.externalId}-${gameType?.id}`}
        id="game-iframe"
        src={gameType.location}
      />
    ),
    [selectedGame, gameType]
  );

  const handleAuth = useCallback((open: boolean) => setOpenAuth({ open }), [setOpenAuth]);

  return (
    <GameContainer id="game-container" isFullScreen={isFullScreen} isMobile={isMobile}>
      {!isAuthenticated && (selectedGame?.demoPlayRestricted || isRealGame) && (
        <RealGameInfo>
          <GameDetail>
            <Typography size="b2" color="var(--white)">
              {t('gameIsUnavailable')}
            </Typography>
            <Typography size="b2" color="var(--white)">
              {t('pleaseLoginToPlay')}
            </Typography>
            <FormGroupButton name="Login" onClick={() => handleAuth(true)} />
            <Authenticationpage handleCloseAuth={() => handleAuth(false)} />
          </GameDetail>
        </RealGameInfo>
      )}
      {isRealGame && isAuthenticated && (
        <UniboOverlay externalId={selectedGame?.externalId}>{renderGameFrame()}</UniboOverlay>
      )}
      {!isRealGame && !selectedGame?.demoPlayRestricted && renderGameFrame()}
    </GameContainer>
  );
};

export default GameView;
