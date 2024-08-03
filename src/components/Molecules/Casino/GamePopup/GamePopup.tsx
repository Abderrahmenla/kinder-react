import dynamic from 'next/dynamic';
import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { CloseIcon, CloseIconContainer, ModalContainer, Overlay } from '@/components/Atoms';
import {
  GameMobileImage,
  GameTileButtons,
  GameTileContainer,
  GameTileDemo,
  GameTileName,
  GameTilePlay,
  GameTileProvider,
  SelectedGameWrapper
} from '@/components/Molecules/Casino/Casino.styles';
import Image from 'next/image';
import { GamePopupProps } from '@/components/Molecules/Casino/GamePopup/types/GamePopupType';
import useSwitchGame from '@/hooks/useSwitchGame';

const FavoriteButton = dynamic(
  () => import('@/components/Molecules/Casino/FavoriteButton/FavoriteButton')
);

const GamePopup: React.FC<GamePopupProps> = ({
  selectedGame,
  isMobile,
  isAuthenticated,
  isFavorite,
  isGameModal,
  open,
  handleCloseModal,
  toggleFavorite
}) => {
  const { onClickPlayNow, onClickDemo } = useSwitchGame(isAuthenticated);
  const { t } = useTranslations();

  return (
    <ModalContainer isMobile={isMobile} open={open} isGameModal={isGameModal}>
      <CloseIconContainer onClick={handleCloseModal} isGameModal={isGameModal}>
        <CloseIcon />
      </CloseIconContainer>
      <Overlay
        data-testid="overlay"
        style={{
          position: 'absolute'
        }}
      />
      {selectedGame && (
        <SelectedGameWrapper selectedGame={selectedGame}>
          {selectedGame && (
            <GameTileContainer>
              <GameTileName>{selectedGame.gameName}</GameTileName>
              <GameMobileImage>
                <Image src={selectedGame?.imageUrl} alt="Game Image" width={162} height={223} />
              </GameMobileImage>
              <GameTileProvider>{selectedGame.productName}</GameTileProvider>
              <FavoriteButton
                toggleFavorite={() => toggleFavorite(selectedGame)}
                isAuthenticated={isAuthenticated}
                isFavorite={isFavorite(selectedGame?.gameId)}
                isMobile
              />
              <GameTileButtons>
                <GameTilePlay onClick={() => onClickPlayNow(selectedGame)}>
                  {t('playNow')}
                </GameTilePlay>
                <GameTileDemo onClick={() => onClickDemo(selectedGame)}>{t('demo')}</GameTileDemo>
              </GameTileButtons>
            </GameTileContainer>
          )}
        </SelectedGameWrapper>
      )}
    </ModalContainer>
  );
};

export default GamePopup;
