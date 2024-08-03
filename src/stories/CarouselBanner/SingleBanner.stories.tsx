import React from 'react';
import styled from '@emotion/styled';
import CarouselBanner from '@/components/Atoms/CarouselBanner/CarouselBanner';
import { singleMockBannerData } from '@/mockData/bannerData/bannerData';
import 'swiper/css/bundle';
import { assets } from '@/config/assets';
import Typography from '@/components/Atoms/Typography/Typography';
import { Button } from '@/components/index';
import { Canvas, Description, Subtitle, Title } from '@storybook/blocks';
import { BannerAssetsProps } from 'src/graphql/types/bannersTypes';

export default {
  title: 'Banner',
  component: CarouselBanner,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Banner Component Documentation',
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            Banner component is the component for rendering a customizable carousel for banners.
          </Description>
          <Subtitle>Basic Usage</Subtitle>
          <Description>
            As this component utilizes Swiper for banner rendering, developers have the ability to
            manage slides per view, modules, and all other Swiper options. Additionally, it enables
            developers to implement a custom design for each banner.
          </Description>
          <Subtitle>Props</Subtitle>
          <ol>
            <li>
              carouselOptions - an object designed to manage various Swiper configuration settings.
            </li>
            <li>assets - an array of objects responsible for managing all asset-related data.</li>
            <li>
              sliderContent - a component designed for customizing the layout of individual slides.
            </li>
          </ol>
          <Canvas />
        </>
      )
    }
  }
};

const BannerDescription = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 16px 69px 30px 30px;
  border-radius: 12px;
  background: rgba(21, 14, 37, 0.5);
  backdrop-filter: blur(10px);
  width: 290px;
  top: 60px;
  left: 58px;
  position: absolute;

  @media screen and (max-width: 1100px) {
    width: fit-content;
    top: 23px;
    left: 23px;
  }

  @media screen and (max-width: 1280px) {
    width: fit-content;
    top: 34px;
    left: 34px;
  }
`;
const BannerTitle = styled(Typography)`
  color: var(--white);
`;
const BannerSubtitle = styled(Typography)`
  color: var(--white);
  margin-bottom: 30px;
`;

const BannerBackground = styled('div')<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  min-height: 1px;
  border-radius: 12px;
  z-index: -1;
`;

const Banner = styled(CarouselBanner)`
  height: 290px;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  width: 100%;

  @media screen and (min-width: 1300px) {
    height: 290px;
  }

  @media screen and (max-width: 1280px) {
    height: 235px;
  }

  @media screen and (max-width: 1100px) {
    height: 212px;
  }
`;

export const SingleColumnBanner = () => {
  const swiperProps = {
    slidesPerView: 1,
    draggable: true
  };

  const SliderContent = (asset: BannerAssetsProps) => {
    return (
      <>
        <BannerBackground src={`${assets}${asset.imageUrl}`} />
        <BannerDescription>
          <BannerTitle size="h3" type="Heading">
            {asset.title}
          </BannerTitle>
          <BannerSubtitle size="b2" type="Body">
            {asset.subtitle}
          </BannerSubtitle>
          <Button size="Large" variant="Primary" showIcon={false}>
            REFERAL NOW
          </Button>
        </BannerDescription>
      </>
    );
  };
  return (
    <Banner
      carouselOptions={swiperProps}
      assets={singleMockBannerData}
      sliderContent={SliderContent}
    />
  );
};
