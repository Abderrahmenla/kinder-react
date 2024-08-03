import React from 'react';
import { singleMockBannerData } from '@/mockData/bannerData/bannerData';
import 'swiper/css/bundle';
import { assets } from '@/config/assets';
import { Banner, BannerBackground } from './F1.Styles';

const swiperProps = {
  slidesPerView: 1,
  draggable: true
};
export const SingleColumnBanner = () => {
  const SliderContent = () => {
    return <BannerBackground src={`${assets}/images/f1-leaderboard/Banner.png`} />;
  };
  return (
    <Banner
      carouselOptions={swiperProps}
      assets={singleMockBannerData}
      sliderContent={SliderContent}
    />
  );
};

export default SingleColumnBanner;
