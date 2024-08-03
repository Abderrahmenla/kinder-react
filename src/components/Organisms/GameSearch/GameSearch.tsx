import {
  GameResultText,
  SingleGame,
  SingleGameWrapper
} from '@/components/Molecules/Casino/SingleGameWrapper/SingleGame.style';
import { Game, SelectedGame } from '@/pages/api/casino/casinoTypes';
import {
  GameTile,
  GameTileDemo,
  GameTileInfo,
  GameTileName,
  GameTilePlay,
  GameTileProvider
} from '@/components/Molecules/Casino/Casino.styles';
import ImageWithFallback from '@/utils/handleImageFallback';
import { assets } from '@/config/assets';
import React, { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { GameSearchProps } from '@/components/Organisms/GameSearch/types/GameSearchTypes';
import { useRecoilValue } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';
import useSwitchGame from '@/hooks/useSwitchGame';
import dynamic from 'next/dynamic';

const FavoriteButton = dynamic(
  () => import('@/components/Molecules/Casino/FavoriteButton/FavoriteButton')
);

const GameSearch: React.FC<GameSearchProps> = ({
  filteredGames,
  isFavorite,
  toggleFavorite,
  setModalState
}) => {
  const { t } = useTranslations();
  const { isAuthenticated } = useRecoilValue(authState);
  const [, setSelectedGame] = useState<SelectedGame | null>(null);
  const { onClickPlayNow, onClickDemo } = useSwitchGame(isAuthenticated);

  return (
    <>
      {filteredGames.length < 1 ? (
        <SingleGameWrapper isSearchWrapper>
          <GameResultText>No results found</GameResultText>
        </SingleGameWrapper>
      ) : (
        <SingleGameWrapper isSearchWrapper>
          {filteredGames.map((gameMain: Game, index) => (
            <SingleGame key={`${gameMain.id}-${index}`}>
              <GameTile className="game-tile">
                <GameTileName>{gameMain.name}</GameTileName>
                <GameTileInfo>
                  <GameTilePlay onClick={() => onClickPlayNow(gameMain)}>
                    {t('playNow')}
                  </GameTilePlay>
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
                    imageUrl: `https://images.spinbet.com/storage/games/${gameMain?.externalId.toLowerCase()}.jpg/format=webp`
                  });
                  setModalState(true);
                }}
                src={`https://images.spinbet.com/storage/games/${gameMain.externalId.toLowerCase()}.jpg/format=webp`}
                fallbackSrc={`https://images.spinbet.com/storage/games/${gameMain.externalId.toLowerCase()}.jpg/format=png`}
                placeholderSrc={`${assets}/images/game-placeholder.jpg`}
                alt="casino-game"
                loading="lazy"
                width={150}
                height={210}
              />
            </SingleGame>
          ))}
        </SingleGameWrapper>
      )}
    </>
  );
};

export default GameSearch;
