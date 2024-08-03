import React from 'react';
import styled from '@emotion/styled';
import CarouselBanner from '@/components/Atoms/CarouselBanner/CarouselBanner';
import { mockBannerData } from '@/mockData/bannerData/bannerData';
import { Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import Link from 'next/link';
import { assets } from '@/config/assets';
import Typography from '@/components/Atoms/Typography/Typography';
import { BannerAssetsProps } from 'src/graphql/types/bannersTypes';

export default {
  title: 'Banner',
  component: CarouselBanner
};

const BannerLabel = styled(Typography)`
  color: var(--white);
  flex: 1;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--purple-4);
  width: fit-content;
`;
const BannerDescription = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 8px;
`;
const BannerTitle = styled(Typography)`
  color: var(--white);
`;
const BannerSubtitle = styled(Typography)`
  color: var(--white);
`;
const BannerLink = styled(Link)<{ imageUrl: string }>`
  color: white;
  padding: 12px 12px 26px;
  display: flex;
  position: relative;
  zindex: 1;
  gap: 108px;
  text-decoration: unset;
  flex-direction: column;

  &:before {
    background: url(${({ imageUrl }) => (imageUrl ? imageUrl : '')}) no-repeat;
    content: '';
    background-size: cover;
    position: absolute;
    width: 100%;
    min-height: 1px;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

export const MultiColumnBanner = () => {
  const swiperProps = {
    spaceBetween: 15,
    slidesPerView: 3,
    draggable: true,
    modules: [Pagination],
    pagination: { clickable: true }
  };

  const SliderContent = (asset: BannerAssetsProps) => {
    return (
      <BannerLink href={asset.ctaLink} imageUrl={`${assets}${asset.imageUrl}`}>
        <BannerLabel size="b2" type="Body">
          {asset.promotionLabel}
        </BannerLabel>
        <BannerDescription>
          <BannerTitle size="h3" type="Heading">
            {asset.title}
          </BannerTitle>
          <BannerSubtitle size="b1" type="Body">
            {asset.subtitle}
          </BannerSubtitle>
        </BannerDescription>
      </BannerLink>
    );
  };

  return (
    <CarouselBanner
      carouselOptions={swiperProps}
      assets={mockBannerData}
      sliderContent={SliderContent}
    />
  );
};
