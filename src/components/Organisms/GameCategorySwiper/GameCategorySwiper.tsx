import 'swiper/css';
import 'swiper/css/navigation';
import { FC, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import dynamic from 'next/dynamic';
import { useFavoriteGames } from '@/hooks/useFavoriteGames';
import { useTranslations } from '@/hooks/useTranslations';
import { authState } from '@/components/state/isAuthenticated';
import { lobbyDataState } from '@/components/state/gameState';
import { assets } from '@/config/assets';
import { CategoryInfo } from '@/components/Molecules/Casino/CategoryInfo';
import { CategoryTitle } from '@/components/Atoms/CategoryTitle.styles';
import { CategoryGames, Game, SelectedGame } from '@/pages/api/casino/casinoTypes';
import { isMobileViewport } from '@/utils/gameUtils';
import ImageWithFallback from '@/utils/handleImageFallback';
import { useLoader } from '@/hooks/useLoader';
import {
  CategoryInfoContainer,
  GameListWrapper,
  GameTile,
  GameTileDemo,
  GameTileInfo,
  GameTileName,
  GameTilePlay,
  GameTileProvider,
  SwiperContainer
} from '@/components/Molecules/Casino/Casino.styles';
import { GameCategoryProps } from './GameCategorySwiper.types';
import {
  fetchCategoryData,
  getCategoryDataFromRecoil,
  getCategoryIconSrc,
  getCategoryId,
  getCategoryName
} from './GameCategorySwiper.utils';
import useSwitchGame from '@/hooks/useSwitchGame';
import { logFetchError } from '@/utils/logFetchError';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/pages/api/types';

const GamePopup = dynamic(() => import('@/components/Molecules/Casino/GamePopup/GamePopup'));
const FavoriteButton = dynamic(
  () => import('@/components/Molecules/Casino/FavoriteButton/FavoriteButton')
);

const GameCategorySwiper: FC<GameCategoryProps> = ({
  category,
  gameCategoryIds,
  customCategoryName
}) => {
  const isMobile = isMobileViewport();
  const { t } = useTranslations();
  const { isAuthenticated } = useRecoilValue(authState);
  const { isLoading, toggleLoader, loadingWrapper } = useLoader('coin');
  const categories = useRecoilValue(lobbyDataState);
  const { isFavorite, toggleFavorite } = useFavoriteGames();
  const { onClickDemo, onClickPlayNow } = useSwitchGame(isAuthenticated);

  const [selectedCategory, setSelectedCategory] = useState<CategoryGames | undefined>();
  const [selectedGame, setSelectedGame] = useState<SelectedGame | null>(null);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        toggleLoader(true);
        const categoryId = getCategoryId({ category, gameCategoryIds, isMobile });

        if (!categoryId) {
          throw Error('Error: categoryId is not provided');
        }

        const categoryData =
          categories.length > 0
            ? getCategoryDataFromRecoil({ categoryId, categories })
            : await fetchCategoryData({ levelId: Number(categoryId), isMobile });

        if (categoryData) {
          setSelectedCategory(categoryData);
        } else {
          throw Error('Error: category data not found');
        }
      } catch (error) {
        logFetchError(error as AxiosError<ErrorResponse>);
      } finally {
        toggleLoader(false);
      }
    };

    fetchData();
  }, [isMobile, category, gameCategoryIds]);

  if (isLoading) return loadingWrapper;
  if (!selectedCategory || selectedCategory?.gameMains?.length === 0) return null;

  const categoryName = getCategoryName({ customCategoryName, category, selectedCategory });
  const categoryIconSrc = getCategoryIconSrc({ categoryName, category });

  return (
    <>
      <GamePopup
        selectedGame={selectedGame}
        isFavorite={isFavorite}
        isAuthenticated={isAuthenticated}
        isMobile={isMobile}
        isGameModal
        open={modalState}
        handleCloseModal={() => setModalState(false)}
        toggleFavorite={toggleFavorite}
      />
      <GameListWrapper>
        <SwiperContainer>
          <CategoryInfo>
            <CategoryInfoContainer>
              <Image src={categoryIconSrc} alt="Category icon" width={15} height={15} />
              <CategoryTitle>{categoryName}</CategoryTitle>
            </CategoryInfoContainer>
            <Link href={`/casino/${categoryName?.toLowerCase().replace(/ /g, '-')}`}>
              {t('viewAll')}
            </Link>
          </CategoryInfo>
          <Swiper
            key={category?.id}
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
            {selectedCategory?.gameMains
              ?.slice(0, 20)
              ?.map(
                (
                  { externalId: gameId, name: gameName, productName }: Game,
                  index: number,
                  games: Game[]
                ) => (
                  <SwiperSlide key={index}>
                    <GameTile className="game-tile">
                      <GameTileName>{gameName}</GameTileName>
                      <GameTileInfo>
                        <GameTilePlay onClick={() => onClickPlayNow(games[index])}>
                          {t('playNow')}
                        </GameTilePlay>
                        <GameTileDemo onClick={() => onClickDemo(games[index])}>
                          {t('demo')}
                        </GameTileDemo>
                      </GameTileInfo>
                      <FavoriteButton
                        toggleFavorite={() => toggleFavorite(games[index])}
                        isAuthenticated={isAuthenticated}
                        isFavorite={isFavorite(gameId)}
                      />
                      <GameTileProvider>{productName}</GameTileProvider>
                    </GameTile>
                    <ImageWithFallback
                      onClick={() => {
                        setSelectedGame({
                          gameId,
                          gameName,
                          productName,
                          imageUrl: `https://images.spinbet.com/storage/games/${gameId.toLowerCase()}.jpg/format=webp`
                        });
                        setModalState(true);
                      }}
                      src={`https://images.spinbet.com/storage/games/${gameId.toLowerCase()}.jpg/format=webp`}
                      fallbackSrc={`https://images.spinbet.com/storage/games/${gameId.toLowerCase()}.jpg/format=png`}
                      placeholderSrc={`${assets}/images/game-placeholder.jpg`}
                      alt="casino-game"
                      loading="eager"
                      width={190}
                      height={200}
                    />
                  </SwiperSlide>
                )
              )}
          </Swiper>
        </SwiperContainer>
      </GameListWrapper>
    </>
  );
};

export default GameCategorySwiper;
