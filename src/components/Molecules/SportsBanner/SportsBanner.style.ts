import CarouselBanner from '@/components/Atoms/CarouselBanner/CarouselBanner';
import Typography from '@/components/Atoms/Typography/Typography';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

export const SportBannerContent = styled('div')`
  transition: transform 0.3s ease-out 0s;
  &:hover {
    transform: translateY(-10px);
  }
  @media (min-width: 768px) {
    padding-top: 10px;
  }
`;

export const CarouselBannerContainer = styled('div')`
  min-height: 1px;
  display: flex;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 25px;
  }
`;

export const BannerContainer = styled(CarouselBanner)`
  width: 100%;
  padding-bottom: 25px !important;
  @media (min-width: 768px) {
    padding: unset !important;
  }
  & .swiper-pagination {
    bottom: 0 !important;
  }
  & .swiper-pagination-bullet {
    width: 26px;
    height: 4px;
    background: var(--dark-violet);
    border-radius: 6px;
  }
  & .swiper-pagination-bullet-active {
    background: var(--soft-violet);
  }
`;

export const BannerImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const SportsBannerBackgroundLink = styled(Link)<{ imageURL: string }>`
  color: white;
  padding: 12px;
  display: flex;
  position: relative;
  zindex: 1;
  text-decoration: unset;
  flex-direction: column;
  justify-content: space-between;
  min-height: 224px;

  &:before {
    background: url(${({ imageURL }) => (imageURL ? imageURL : '')}) no-repeat;
    content: '';
    background-size: cover;
    position: absolute;
    width: 100%;
    min-height: 1px;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 16px;
    background-position: right;

    @media (min-width: 1025px) {
      background-position: unset;
    }
    @media (width: 540px) {
      background-position: unset;
    }
  }
`;

export const BannerLabel = styled(Typography)`
  color: var(--white);
  flex: 1;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--purple-4);
  width: fit-content;
`;
export const BannerDescription = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding: 0px 0px 12px 12px;
`;
export const BannerTitle = styled(Typography)`
  color: var(--darker-white);
  line-height: 1;
`;
export const BannerSubtitle = styled(Typography)`
  color: var(--darker-white);
  line-height: 1;
`;
