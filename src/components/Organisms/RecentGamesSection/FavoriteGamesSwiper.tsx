import React from 'react';
import {
  GameTile,
  GameTileName,
  GameTileInfo,
  GameTilePlay,
  GameTileDemo,
  GameTileProvider,
  SwiperContainer,
  SwiperContainerFavorites,
  CategoryInfoContainer
} from '@/components/Molecules/Casino/Casino.styles';
import { FavoriteGame } from '@/pages/api/casino/casinoTypes';
import { useTranslations } from '@/hooks/useTranslations';
import ImageWithFallback from '@/utils/handleImageFallback';
import { CategoryInfo } from '@/components/Molecules/Casino/CategoryInfo';
import Image from 'next/image';
import { assets } from '@/config/assets';
import { CategoryTitle } from '@/components/Atoms/CategoryTitle.styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';
import useSwitchGame from '@/hooks/useSwitchGame';
import { RecentSectionProps } from './types/RecentGamesSectionTypes';

const RecentGamesSection: React.FC<RecentSectionProps> = ({
  recentGames,
  setModalState,
  setSelectedGame
}) => {
  const { t } = useTranslations();
  const { isAuthenticated } = useRecoilValue(authState);
  const { onClickPlayNow, onClickDemo } = useSwitchGame(isAuthenticated);

  return (
    <SwiperContainerFavorites>
      <SwiperContainer key={recentGames[0].id}>
        <CategoryInfo>
          <CategoryInfoContainer>
            <Image
              src={`${assets}/images/casino-categories/Favorites.svg`}
              alt={''}
              width={15}
              height={15}
            />
            <CategoryTitle>{'Recent Games'}</CategoryTitle>
          </CategoryInfoContainer>
          <Link href={`casino/favorites`}>{t('viewAll')}</Link>
        </CategoryInfo>
        <Swiper
          spaceBetween={12}
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
              slidesPerView: 5,
              spaceBetween: 10,
              slidesPerGroup: 2
            },
            1200: { slidesPerView: 7, slidesPerGroup: 3 }
          }}
          modules={[Navigation]}
          navigation={true}
        >
          {recentGames.map((recentGame: FavoriteGame | any, index: number) => (
            <SwiperSlide key={`${recentGame.gameExternalId}-${index}`}>
              <GameTile className="game-tile">
                <GameTileName>{recentGame.gameName}</GameTileName>
                <GameTileInfo>
                  <GameTilePlay onClick={() => onClickPlayNow(recentGame)}>
                    {t('playNow')}
                  </GameTilePlay>
                  <GameTileDemo onClick={() => onClickDemo(recentGame)}>{t('demo')}</GameTileDemo>
                </GameTileInfo>
                <GameTileProvider>{recentGame.product}</GameTileProvider>
              </GameTile>
              <ImageWithFallback
                onClick={() => {
                  setSelectedGame({
                    gameId: recentGame.gameExternalId,
                    gameName: recentGame.gameName,
                    productName: recentGame.product,
                    imageUrl: `https://images.spinbet.com/storage/games/${recentGame?.gameExternalId.toLowerCase()}.jpg/format=webp`
                  });
                  setModalState(true);
                }}
                src={`https://images.spinbet.com/storage/games/${recentGame.gameExternalId.toLowerCase()}.jpg/format=webp`}
                fallbackSrc={`https://images.spinbet.com/storage/games/${recentGame.gameExternalId.toLowerCase()}.jpg/format=png`}
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
    </SwiperContainerFavorites>
  );
};

export default RecentGamesSection;
