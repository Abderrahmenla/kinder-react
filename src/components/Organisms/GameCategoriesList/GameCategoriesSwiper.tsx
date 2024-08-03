import React, { useRef } from 'react';
import {
  GameListWrapper,
  SwiperContainer,
  GameTile,
  GameTileName,
  GameTileInfo,
  GameTilePlay,
  GameTileDemo,
  GameTileProvider,
  LazyLoadWrapper,
  CategoryInfoContainer
} from '@/components/Molecules/Casino/Casino.styles';
import { Game, CategoryGames } from '@/pages/api/casino/casinoTypes';
import ImageWithFallback from '@/utils/handleImageFallback';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useTranslations } from '@/hooks/useTranslations';
import { CasinoProviderLobby } from '@/components/Molecules/Casino/CasinoProvider/CasinoProvider.styles';
import { CasinoProvider } from '@/components/Molecules/Casino/CasinoProvider/CasinoProvider';
import { CategoryInfo } from '@/components/Molecules/Casino/CategoryInfo';
import Image from 'next/image';
import { assets } from '@/config/assets';
import { CategoryTitle } from '@/components/Atoms/CategoryTitle.styles';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { GameListProps } from '@/components/Organisms/GameCategoriesList/types/GameCategoriesListTypes';
import useLazyLoad from '@/hooks/useLazyLoad';
import Link from 'next/link';
import { getCategoryIconUrl, getCategoryNameFromCms } from '@/utils/gameUtils';
import useSwitchGame from '@/hooks/useSwitchGame';
import dynamic from 'next/dynamic';
// import axios from 'axios';
const FavoriteButton = dynamic(
  () => import('@/components/Molecules/Casino/FavoriteButton/FavoriteButton')
);

const GameCategoriesSwiper: React.FC<GameListProps> = ({
  categoryGames,
  selectedCategory,
  isAuthenticated,
  isFavorite,
  setModalState,
  setSelectedGame,
  providers,
  toggleFavorite,
  casinoCategoriesData
}) => {
  const { t } = useTranslations();

  const isMobile = UseMediaQuery(576);
  let isLobbyAdded = false;

  const providerRef = useRef<HTMLDivElement>(null);
  const [providerLoaded] = useLazyLoad(providerRef, 0);
  const { onClickPlayNow, onClickDemo } = useSwitchGame(isAuthenticated);
  return (
    <GameListWrapper>
      {categoryGames
        .slice(0, 7)
        .filter((categoryGame: CategoryGames) =>
          selectedCategory
            ? categoryGame.name.toLowerCase().replace(/ /g, '-') === selectedCategory
            : true
        )
        .map((categoryGame: CategoryGames, index) => {
          const categoryId = categoryGame.id;
          const categoryIconUrl = getCategoryIconUrl(String(categoryGame.id), casinoCategoriesData);
          const categoryCMSName = getCategoryNameFromCms(
            String(categoryGame.id),
            casinoCategoriesData
          );

          const imageSrc =
            categoryIconUrl || `${assets}/images/casino-categories/${categoryGame.name}.svg`;

          if (categoryId.toString() === 'provider-category') {
            if (!isLobbyAdded) {
              isLobbyAdded = true;
              return (
                <LazyLoadWrapper
                  ref={providerRef}
                  key={`${categoryGame.id}-${index}`}
                  isVisible={providerLoaded}
                >
                  {providerLoaded && (
                    <CasinoProviderLobby>
                      <CasinoProvider providers={providers} />
                    </CasinoProviderLobby>
                  )}
                </LazyLoadWrapper>
              );
            }
          }
          return (
            <SwiperContainer key={`${categoryGame.id}-${index}`}>
              <CategoryInfo>
                <CategoryInfoContainer>
                  <Image src={imageSrc} alt={''} width={15} height={15} />
                  <CategoryTitle>{categoryCMSName}</CategoryTitle>
                </CategoryInfoContainer>
                <Link href={`/casino/${categoryGame.name.toLowerCase().replace(/ /g, '-')}`}>
                  {t('viewAll')}
                </Link>
              </CategoryInfo>
              <Swiper
                key={`${categoryGame.id}-${index}`}
                spaceBetween={16}
                slidesPerView={7}
                draggable={true}
                breakpoints={{
                  320: {
                    slidesPerView: 3,
                    spaceBetween: 7,
                    slidesPerGroup: 1,
                    cssMode: true
                  },
                  532: {
                    slidesPerView: 4,
                    spaceBetween: 7,
                    slidesPerGroup: 2
                  },
                  850: {
                    cssMode: true,
                    slidesPerView: 5,
                    spaceBetween: 10,
                    slidesPerGroup: 5
                  },
                  1200: {
                    cssMode: true,
                    slidesPerView: 7,
                    slidesPerGroup: 7,
                    touchRatio: 1
                  }
                }}
                modules={[Navigation]}
                navigation={true}
              >
                {categoryGame?.gameMains?.slice(0, 20).map((game: Game, index: number) => (
                  <SwiperSlide key={index}>
                    <GameTile className="game-tile">
                      <GameTileName>{game.name}</GameTileName>
                      <GameTileInfo>
                        <GameTilePlay onClick={() => onClickPlayNow(game)}>
                          {t('playNow')}
                        </GameTilePlay>
                        <GameTileDemo onClick={() => onClickDemo(game)}>{t('demo')}</GameTileDemo>
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
                          imageUrl: `https://images.spinbet.com/storage/games/${game.externalId.toLowerCase()}.jpg/format=webp`
                        });
                        setModalState(true);
                      }}
                      src={
                        isMobile
                          ? `https://images.spinbet.com/storage/games/${game.externalId.toLowerCase()}.jpg/format=webp`
                          : `https://images.spinbet.com/storage/games/${game.externalId.toLowerCase()}.jpg/format=webp`
                      }
                      fallbackSrc={
                        isMobile
                          ? `https://images.spinbet.com/storage/games/${game.externalId.toLowerCase()}.jpg/format=png`
                          : `https://images.spinbet.com/storage/games/${game.externalId.toLowerCase()}.jpg/format=png`
                      }
                      placeholderSrc={`${assets}/images/game-placeholder.jpg`}
                      alt="casino-game"
                      loading="eager"
                      width={190}
                      height={200}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </SwiperContainer>
          );
        })}
    </GameListWrapper>
  );
};

export default GameCategoriesSwiper;
