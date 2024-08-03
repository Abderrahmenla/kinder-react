import {
  GameTile,
  GameTileDemo,
  GameTileInfo,
  GameTileName,
  GameTilePlay,
  GameTileProvider
} from '@/components/Molecules/Casino/Casino.styles';
import FavoriteButton from '@/components/Molecules/Casino/FavoriteButton/FavoriteButton';
import {
  GameTileSearch,
  ModalContentResultWrapper
} from '@/components/Molecules/Casino/SearchInput/SearchInput.style';
import { GameSelectionType } from '@/components/state/gameSelectionState';
import { mobileModalState } from '@/components/state/mobileModalState';
import { assets } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';
import { Game } from '@/pages/api/casino/casinoTypes';
import ImageWithFallback from '@/utils/handleImageFallback';
import { memo } from 'react';
import { useSetRecoilState } from 'recoil';

interface SearchModalResultProps {
  index: number;
  game: Game;
  handleGameSwitch: (gameType: GameSelectionType, game: Game) => void;
  isAuthenticated: boolean;
  toggleFavorite: (game: Game) => void;
  isFavorite: (externalId?: string | undefined) => boolean;
  setSelectedGame: (selectedGame: {
    gameId: string;
    gameName: string;
    productName: string;
    imageUrl: string;
  }) => void;
}

export const SearchModalResult = memo(
  ({
    index,
    game,
    handleGameSwitch,
    isAuthenticated,
    toggleFavorite,
    isFavorite,
    setSelectedGame
  }: SearchModalResultProps) => {
    const { t } = useTranslations();
    const setMobileModal = useSetRecoilState(mobileModalState);
    return (
      <ModalContentResultWrapper key={`${game.id}-${index}`}>
        <GameTileSearch>
          <GameTile className="game-tile">
            <GameTileName>{game.name}</GameTileName>
            <GameTileInfo>
              <GameTilePlay onClick={() => handleGameSwitch(GameSelectionType.real, game)}>
                {t('playNow')}
              </GameTilePlay>
              <GameTileDemo onClick={() => handleGameSwitch(GameSelectionType.demo, game)}>
                {t('demo')}
              </GameTileDemo>
            </GameTileInfo>
            <FavoriteButton
              toggleFavorite={() => toggleFavorite(game)}
              isAuthenticated={isAuthenticated}
              isFavorite={isFavorite(game.externalId)}
            />
            <GameTileProvider>{game.productName}</GameTileProvider>
          </GameTile>
          <ImageWithFallback
            onClick={() => {
              setSelectedGame({
                gameId: game.externalId,
                gameName: game.name,
                productName: game.productName,
                imageUrl: `https://images.spinbet.com/storage/games/${game?.externalId.toLowerCase()}.jpg/format=webp`
              });
              setMobileModal(true);
            }}
            src={`https://images.spinbet.com/storage/games/${game.externalId.toLowerCase()}.jpg/format=webp`}
            fallbackSrc={`https://images.spinbet.com/storage/games/${game.externalId.toLowerCase()}.jpg/format=png`}
            placeholderSrc={`${assets}/images/game-placeholder.jpg`}
            alt="casino-game"
            width={150}
            height={210}
          />
        </GameTileSearch>
      </ModalContentResultWrapper>
    );
  }
);

SearchModalResult.displayName = 'SearchModalResult';
