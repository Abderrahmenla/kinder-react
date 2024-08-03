import React, { memo, useCallback } from 'react';
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
import FavoriteButton from '@/components/Molecules/Casino/FavoriteButton/FavoriteButton';
import { useTranslations } from '@/hooks/useTranslations';
import { SelectedGame } from '@/pages/api/casino/casinoTypes';
import { useRecoilState } from 'recoil';
import { GameSelectionType } from '@/components/state/gameSelectionState';
import { mobileModalState } from '@/components/state/mobileModalState';

interface SearchGameModalProps {
  isMobile?: boolean;
  handleGameSwitch: (gameType: GameSelectionType, game: SelectedGame) => void;
  isAuthenticated: boolean;
  toggleFavorite: (game: SelectedGame) => void;
  isFavorite: (externalId?: string | undefined) => boolean;
  selectedGame: SelectedGame | null;
}

export const SearchGameModal = memo(
  ({
    isMobile,
    selectedGame,
    isAuthenticated,
    toggleFavorite,
    isFavorite,
    handleGameSwitch
  }: SearchGameModalProps) => {
    const [mobileModal, setMobileModal] = useRecoilState(mobileModalState);
    const handleCloseModal = useCallback(() => setMobileModal(false), [setMobileModal]);
    const { t } = useTranslations();

    return (
      <ModalContainer isMobile={isMobile} open={mobileModal} isGameModal={true}>
        <CloseIconContainer onClick={handleCloseModal} isGameModal={true}>
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
                />
                <GameTileButtons>
                  <GameTilePlay
                    onClick={() => handleGameSwitch(GameSelectionType.real, selectedGame)}
                  >
                    {t('playNow')}
                  </GameTilePlay>
                  <GameTileDemo
                    onClick={() => handleGameSwitch(GameSelectionType.demo, selectedGame)}
                  >
                    {t('demo')}
                  </GameTileDemo>
                </GameTileButtons>
              </GameTileContainer>
            )}
          </SelectedGameWrapper>
        )}
      </ModalContainer>
    );
  }
);

SearchGameModal.displayName = 'SearchGameModal';
