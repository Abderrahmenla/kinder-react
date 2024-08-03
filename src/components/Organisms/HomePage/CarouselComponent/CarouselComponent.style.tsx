import Button from '@/components/Atoms/Button/Button';
import CarouselBanner from '@/components/Atoms/CarouselBanner/CarouselBanner';
import Typography from '@/components/Atoms/Typography/Typography';
import styled from '@emotion/styled';

export interface PaginationButtonProps {
  active: boolean;
}

export const PaginationContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaginationButton = styled('div')<{ active: boolean }>`
  background-color: ${({ active }) => (active ? 'var(--yellow-4)' : 'var(--very-dark-violet-5)')};
  border-radius: 9px;
  height: 8px;
  width: 8px;
  margin-right: 10px;
  cursor: pointer;
`;

export const BannerDescription = styled('div')`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 15px;
  width: 92%;
  bottom: 0;
  left: 0;
  background: linear-gradient(0deg, #150E25 70.35%, rgba(21, 14, 37, 0.00) 100.22%);
  );
  

  @media screen and (min-width: 768px) {
    width: fit-content;
    height: fit-content;
    padding: 24px;
    top: 10%;
    left: 5%;
    border-radius: 12px;
    background: rgba(21, 14, 37, 0.5);
    backdrop-filter: blur(10px);
  }
`;

export const BannerTitle = styled(Typography)`
  color: var(--white);
  line-height: 1;
  margin-bottom: 5px;
`;

export const BannerSubtitle = styled(Typography)`
  color: var(--white);
  margin-bottom: 8px;
  line-height: 1;
  width: 70%;

  @media screen and (min-width: 768px) {
    margin-bottom: 30px;
    width: 100%;
  }
`;

export const BannerFooter = styled(Typography)`
  font-weight: 600;
  color: var(--white);
  margin-top: 16px;
`;

export const BannerBackground = styled('div')<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  min-height: 1px;
  border-radius: 6px;
  z-index: -1;

  @media screen and (max-width: 1100px) {
    background-position: 85%;
  }
`;

export const Banner = styled(CarouselBanner)`
  height: 285px;
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 6px;

  @media screen and (min-width: 1300px) {
    height: 285px;
  }

  @media screen and (max-width: 1280px) {
    height: 235px;
  }

  @media screen and (max-width: 1100px) {
    height: 270px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    background: rgba(21, 14, 37, 0.8);
    backdrop-filter: blur(10px);
    width: 5%;
    height: fit-content;
    opacity: 0;
    transition: opacity 0.3s linear;

    &:after {
      font-size: 12px;
      font-weight: 700;
      color: var(--white);
      padding: 20px 0;
    }

    &.swiper-button-disabled {
      display: none;
    }
  }

  .swiper-button-prev {
    justify-content: flex-end;
    left: 0;
    border-radius: 0 58px 58px 0;

    &:after {
      padding-right: 16px;
    }
  }

  .swiper-button-next {
    justify-content: flex-start;
    right: 0;
    border-radius: 58px 0 0 58px;

    &:after {
      padding-left: 16px;
    }
  }

  @media screen and (max-width: 767px) {
    .swiper-button-prev,
    .swiper-button-next {
      display: none;
    }
  }

  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 1;
    }
  }
`;

export const BannerButton = styled(Button)`
  border-radius: 6px;

  width: 95%;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

export const BannerButtonText = styled(Typography)`
  font-weight: 700;
`;
