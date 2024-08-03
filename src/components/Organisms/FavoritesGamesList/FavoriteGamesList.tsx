import React from 'react';
import {
  GameTile,
  GameTileName,
  GameTileInfo,
  GameTilePlay,
  GameTileDemo,
  GameTileProvider
} from '@/components/Molecules/Casino/Casino.styles';
import ImageWithFallback from '@/utils/handleImageFallback';
import { assets } from '@/config/assets';
import { SingleGame } from '@/components/Molecules/Casino/SingleGameWrapper/SingleGame.style';
import { FavoriteGamesListType } from '@/components/Organisms/FavoritesGamesList/types/FavoriteGamesListType';
import { useTranslations } from '@/hooks/useTranslations';
import useSwitchGame from '@/hooks/useSwitchGame';
import dynamic from 'next/dynamic';

const FavoriteButton = dynamic(
  () => import('@/components/Molecules/Casino/FavoriteButton/FavoriteButton')
);

const FavoritesGamesList: React.FC<FavoriteGamesListType> = ({
  isFavorite,
  setModalState,
  setSelectedGame,
  favoriteGame,
  isAuthenticated,
  toggleFavorite,
  index
}) => {
  const { t } = useTranslations();
  const {
    product = '',
    gameName = '',
    gameExternalId = ''
  } = favoriteGame ?? { product: '', gameName: '', gameExternalId: '' };
  const { onClickPlayNow, onClickDemo } = useSwitchGame(isAuthenticated);

  return (
    <SingleGame key={`${gameExternalId}-${index}`}>
      <GameTile className="game-tile">
        <GameTileName>{gameName}</GameTileName>
        <GameTileInfo>
          <GameTilePlay onClick={() => onClickPlayNow(favoriteGame)}>{t('playNow')}</GameTilePlay>
          <GameTileDemo onClick={() => onClickDemo(favoriteGame)}>{t('demo')}</GameTileDemo>
        </GameTileInfo>
        <FavoriteButton
          toggleFavorite={() => toggleFavorite(favoriteGame)}
          isAuthenticated={isAuthenticated}
          isFavorite={isFavorite(gameExternalId)}
        />
        <GameTileProvider>{product}</GameTileProvider>
      </GameTile>
      <ImageWithFallback
        onClick={() => {
          setSelectedGame({
            gameId: gameExternalId,
            gameName,
            productName: product,
            imageUrl: `https://images.spinbet.com/storage/games/${gameExternalId.toLowerCase()}.jpg/format=webp`
          });
          setModalState(true);
        }}
        src={`https://images.spinbet.com/storage/games/${gameExternalId.toLowerCase()}.jpg/format=webp`}
        fallbackSrc={`https://images.spinbet.com/storage/games/${gameExternalId.toLowerCase()}.jpg/format=png`}
        placeholderSrc={`${assets}/images/game-placeholder.jpg`}
        alt="casino-game"
        loading="lazy"
        width={190}
        height={200}
      />
    </SingleGame>
  );
};

export default FavoritesGamesList;
