import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Swiper as SwiperClass } from 'swiper';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { BannerAssetsProps, BannerV2Props } from 'src/graphql/types/bannersTypes';
import {
  Banner,
  BannerBackground,
  BannerButton,
  BannerButtonText,
  BannerDescription,
  BannerFooter,
  BannerSubtitle,
  BannerTitle,
  PaginationButton,
  PaginationContainer
} from './CarouselComponent.style';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { transformUploadUrls } from '@/utils/transformAssetsUtil';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { openToggleAuthState } from '@/components/state/openToggleAuthState';
import { openAuthPageState } from '@/components/state/openAuthPageState';

const CarouselComponent: React.FC<{ banners: BannerV2Props[] }> = ({ banners }) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isMobile = UseMediaQuery(766);
  const router = useRouter();
  const setToggleAuthState = useSetRecoilState(openToggleAuthState);
  const setOpenAuthState = useSetRecoilState(openAuthPageState);

  const handleSlideChange = useCallback(() => {
    if (!swiper || !swiper.slides) return;

    swiper.slides.forEach((slide, index) => {
      const video = slide.querySelector('video');

      if (index === swiper.activeIndex) {
        video?.play();
      } else {
        video?.pause();
      }
    });
  }, [swiper]);

  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', () => {
        setActiveIndex(swiper.activeIndex);
        handleSlideChange();
      });
    }
    return () => {
      if (swiper) {
        swiper.off('slideChange');
      }
    };
  }, [swiper, handleSlideChange]);

  const handlePaginationClick = useCallback(
    (index: number) => {
      if (swiper) {
        swiper.slideTo(index);
        setActiveIndex(index);
      }
    },
    [swiper]
  );

  const carouselOptions = useMemo(() => {
    return {
      onSwiper: setSwiper,
      spaceBetween: 30,
      effect: 'fade',
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      navigation: true,
      modules: [EffectFade, Pagination, Autoplay, Navigation]
    };
  }, []);

  const assets = useMemo(() => {
    return banners?.map((banner: BannerV2Props) => {
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
  }, [banners]);

  const handleBannerButtonClick = useCallback(
    (ctaLink: string, ctaType: string) => {
      if (ctaType === 'Link') {
        router.push(ctaLink);
      } else if (ctaLink === 'signin' || ctaLink === 'register') {
        setToggleAuthState({ toggle: ctaLink });
        setOpenAuthState({ open: true });
      }
    },
    [router, setOpenAuthState, setToggleAuthState]
  );

  const SliderContent = useCallback(
    (asset: BannerAssetsProps) => {
      return (
        <>
          <BannerBackground src={transformUploadUrls(asset.imageUrl)} />
          <BannerDescription>
            <BannerTitle size="h3" type="Heading">
              {asset.title}
            </BannerTitle>
            <BannerSubtitle size="b2" type="Body">
              {asset.subtitle}
            </BannerSubtitle>
            <BannerButton
              size="Large"
              variant="Primary"
              showIcon={false}
              handleClick={() => handleBannerButtonClick(asset.ctaLink, asset.ctaType)}
            >
              <BannerButtonText size="b2" type="Body">
                {asset.ctaName}
              </BannerButtonText>
            </BannerButton>
            {!isMobile && asset.promotionLabel !== '' && (
              <BannerFooter size="b2" type="Body">
                {asset.promotionLabel}
              </BannerFooter>
            )}
          </BannerDescription>
        </>
      );
    },
    [isMobile]
  );

  return (
    <>
      <Banner
        carouselOptions={carouselOptions}
        assets={assets}
        sliderContent={SliderContent}
        className="homepage-banner"
      />

      {isMobile && (
        <PaginationContainer>
          {swiper &&
            Array.from({ length: assets.length }, (_, index) => (
              <PaginationButton
                active={index === activeIndex}
                key={index}
                onClick={() => handlePaginationClick(index)}
              />
            ))}
        </PaginationContainer>
      )}
    </>
  );
};

export default CarouselComponent;
