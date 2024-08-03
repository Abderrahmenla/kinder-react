import React from 'react';
import {
  CasinoProviderWrapper,
  SingleProvider
} from '@/components/Molecules/Casino/CasinoProvider/CasinoProvider.styles';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { CategoryTitle } from '@/components/Atoms/CategoryTitle.styles';
import { CategoryInfo } from '@/components/Molecules/Casino/CategoryInfo';
import Link from 'next/link';
import { assets } from '@/config/assets';

interface CasinoProviderProps {
  providers: any;
}

export const CasinoProvider: React.FC<CasinoProviderProps> = ({ providers }) => (
  <CasinoProviderWrapper className={'game-wrapper'}>
    <CategoryInfo>
      <Image
        src={`${assets}/images/game-providers.svg`}
        alt="game-providers"
        width={15}
        height={15}
      />
      <CategoryTitle>Game Providers</CategoryTitle>
    </CategoryInfo>
    <Swiper
      spaceBetween={10}
      slidesPerView={7}
      draggable={true}
      breakpoints={{
        320: { slidesPerView: 3 },
        530: { slidesPerView: 4 },
        850: { slidesPerView: 4 },
        991: { slidesPerView: 5 },
        1200: { slidesPerView: 7 }
      }}
      modules={[Navigation]}
      navigation={true}
    >
      {providers?.map((game: any, index: number) => {
        if (game !== 'All Providers') {
          return (
            <SwiperSlide key={`${game}-${index}`}>
              {game && (
                <SingleProvider>
                  <Link href={`/casino/provider/${game.toLowerCase().replace(/ /g, '-')}`}>
                    <Image
                      src={`${assets}/images/game-providers/${game}.svg`}
                      width={100}
                      height={35}
                      alt="game-icon"
                    />
                  </Link>
                </SingleProvider>
              )}
            </SwiperSlide>
          );
        } else {
          return null;
        }
      })}
    </Swiper>
  </CasinoProviderWrapper>
);
