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
import { GameCount } from '@/components/Atoms/GameCount.style';
import { ShowMore } from '@/components/Atoms/ShowMore';
import { CategoryGamesListType } from '@/components/Organisms/CategoryGamesList/types/CategoryGamesListType';
import { useTranslations } from '@/hooks/useTranslations';
import useSwitchGame from '@/hooks/useSwitchGame';
import dynamic from 'next/dynamic';

const FavoriteButton = dynamic(
  () => import('@/components/Molecules/Casino/FavoriteButton/FavoriteButton')
);

const CategoryGamesList: React.FC<CategoryGamesListType> = ({
  isFavorite,
  setModalState,
  setSelectedGame,
  isAuthenticated,
  toggleFavorite,
  handleShowMore,
  item,
  gameLimit
}) => {
  const { t } = useTranslations();
  const { onClickPlayNow, onClickDemo } = useSwitchGame(isAuthenticated);

  return (
    <React.Fragment key={item.id}>
      {item.gameMains.slice(0, gameLimit).map((gameMain, index) => (
        <SingleGame key={`${gameMain.id}-${index}`}>
          <GameTile className="game-tile">
            <GameTileName>{gameMain.name}</GameTileName>
            <GameTileInfo>
              <GameTilePlay onClick={() => onClickPlayNow(gameMain)}>{t('playNow')}</GameTilePlay>
              <GameTileDemo onClick={() => onClickDemo(gameMain)}>{t('demo')}</GameTileDemo>
            </GameTileInfo>
            <FavoriteButton
              toggleFavorite={() => toggleFavorite(gameMain)}
              isAuthenticated={isAuthenticated}
              isFavorite={isFavorite(gameMain.externalId)}
            />
            <GameTileProvider>{gameMain.productName}</GameTileProvider>
          </GameTile>
          <ImageWithFallback
            onClick={() => {
              setSelectedGame({
                gameId: gameMain.externalId,
                gameName: gameMain.name,
                productName: gameMain.productName,
                imageUrl: `https://images.spinbet.com/storage/games/${gameMain.externalId.toLowerCase()}.jpg/format=webp`
              });
              setModalState(true);
            }}
            src={`https://images.spinbet.com/storage/games/${gameMain.externalId.toLowerCase()}.jpg/format=webp`}
            fallbackSrc={`https://images.spinbet.com/storage/games/${gameMain.externalId.toLowerCase()}.jpg/format=png`}
            placeholderSrc={`${assets}/images/game-placeholder.jpg`}
            alt="casino-game"
            loading="lazy"
            width={190}
            height={200}
          />
        </SingleGame>
      ))}
      {item.gameMains.length > gameLimit && (
        <GameCount>
          <ShowMore onClick={handleShowMore}>
            {t('loadMoreGames')}
            <span>+</span>
          </ShowMore>
        </GameCount>
      )}
    </React.Fragment>
  );
};

export default CategoryGamesList;
