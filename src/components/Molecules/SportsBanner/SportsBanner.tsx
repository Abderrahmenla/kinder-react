import React, { useMemo } from 'react';
import { BannerAssetsProps, BannerV2Props } from 'src/graphql/types/bannersTypes';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import {
  BannerContainer,
  BannerDescription,
  BannerLabel,
  BannerSubtitle,
  BannerTitle,
  CarouselBannerContainer,
  SportBannerContent,
  SportsBannerBackgroundLink
} from './SportsBanner.style';
import ReactHtmlParser from 'react-html-parser';
import { transformUploadUrls } from '@/utils/transformAssetsUtil';

const carouselOptions = {
  modules: [Pagination],
  spaceBetween: 15,
  pagination: { clickable: true },
  slidesPerView: 3,
  draggable: true,
  breakpoints: {
    280: { slidesPerView: 1 },
    768: { slidesPerView: 3, spaceBetween: 15 }
  },
  zoom: false
};

const SliderContent = (asset: BannerAssetsProps) => {
  return (
    <SportBannerContent>
      <SportsBannerBackgroundLink
        href={`${asset?.ctaLink}`}
        imageURL={transformUploadUrls(asset?.imageUrl)}
      >
        <div>
          <BannerLabel size="b3">{asset?.promotionLabel}</BannerLabel>
        </div>
        <BannerDescription>
          <BannerTitle size="h3">{asset?.title}</BannerTitle>
          <BannerSubtitle size="b1">{ReactHtmlParser(asset?.subtitle)}</BannerSubtitle>
        </BannerDescription>
      </SportsBannerBackgroundLink>
    </SportBannerContent>
  );
};

export const SportsBanner: React.FC<{ simpleBanners: BannerV2Props[] }> = ({ simpleBanners }) => {
  const assets = useMemo(() => {
    return simpleBanners?.map((banner: BannerV2Props) => {
      const data = banner.attributes;
      return {
        ctaType: data.CTAType,
        ctaLink: data.CTALink,
        ctaName: data.CTAName,
        title: data.Title,
        subtitle: data.Subtitle,
        promotionLabel: data.PromotionLabel,
        imageUrl: data.BackgroundImage.data.attributes.url
      };
    });
  }, [simpleBanners]);

  return (
    <CarouselBannerContainer>
      <BannerContainer
        carouselOptions={carouselOptions}
        assets={assets}
        sliderContent={SliderContent}
        className="sportspage-banner"
      />
    </CarouselBannerContainer>
  );
};
