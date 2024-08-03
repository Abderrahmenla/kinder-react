import React from 'react';
import { BannerAssetsProps, CarouselBannerProps } from 'src/graphql/types/bannersTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CarouselBanner: React.FC<CarouselBannerProps> = ({
  carouselOptions,
  assets,
  sliderContent: SliderContent,
  className
}) => {
  return (
    <Swiper className={className} {...carouselOptions} breakpointsBase="window">
      {assets?.map((data: BannerAssetsProps, index: number) => {
        return (
          <SwiperSlide key={`banner-${index}`}>
            <SliderContent {...data} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CarouselBanner;
