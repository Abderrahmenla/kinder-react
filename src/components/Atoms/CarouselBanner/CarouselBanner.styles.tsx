import styled from '@emotion/styled';
import Link from 'next/link';

export const CarouselBannerContainer = styled('div')`
  min-height: 224px;
  display: flex;
  margin: 25px 0;
  & .swiper {
    width: 100%;
    & .swiper-pagination {
      bottom: 0 !important;
    }
    & .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background: var(--very-dark-des-violet);
      opacity: 1;
    }
    & .swiper-pagination-bullet-active {
      border: 1px solid var(--yellow-4);
      background: transparent;
    }
    @media (max-width: 1300px) {
      padding: 25px 0;
    }
    @media (max-width: 991px) {
      padding: 11px 0 25px 0;
    }
  }
  @media (max-width: 1300px) {
    margin: 0 20px;
  }
  @media (max-width: 991px) {
    min-height: 270px;
    margin: 0 20px;
  }
`;

export const BannerLink = styled(Link)<{ imageUrl: string }>`
  color: white;
  display: flex;
  position: relative;
  z-index: 1;
  gap: 108px;
  text-decoration: unset;
  flex-direction: column;
  height: 100%;

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
    border-radius: 6px;
  }
`;
