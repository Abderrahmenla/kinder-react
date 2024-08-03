import { Swiper, SwiperModule, SwiperOptions } from 'swiper/types';
import { SeoPagesProps } from './seo';
import { Dispatch, SetStateAction } from 'react';
import { CasinoLobbyType, HorizontalMenuType } from '@/graphql/types/casinoLobbyTypes';
import { CasinoCategories } from './navigation';

export interface BannersProps {
  banners: BannerProps[];
}

export interface BannersV2Props {
  banners: BannerV2Props[];
}

export interface BannerV2Props {
  id: string;
  attributes: {
    Title: string;
    Subtitle: string;
    CTAName: string;
    CTALink: string;
    CTAType: string;
    PromotionLabel: string;
    BackgroundImage: {
      data: {
        id: string;
        attributes: {
          url: string;
        };
      };
    };
  };
}

export interface BannerProps {
  id: string;
  attributes: {
    Title: string;
    SubTitle: string;
    PageType: string;
    CTAName: string;
    CTAValue: string;
    CTAType: string;
    BackgroundImage: {
      data: {
        id: string;
        attributes: {
          url: string;
        };
      };
    };
  };
}

export interface SimpleBannersDataType {
  simpleBanners: simpleBannerProps[];
  seo?: SeoPagesProps | any;
}
export interface simpleBannerProps {
  id: string;
  attributes: {
    PageType: string;
    CTAValue: string;
    BackgroundImage: {
      data: {
        id: string;
        attributes: {
          url: string;
        };
      };
    };
  };
}

export interface BannerAssetsProps {
  ctaType: string;
  ctaLink: string;
  ctaName: string;
  title: string;
  subtitle: string;
  promotionLabel: string;
  imageUrl: string;
}

export interface CarouselBannerProps {
  carouselOptions: {
    spaceBetween?: number;
    draggable?: boolean;
    slidesPerView?: number;
    modules?: SwiperModule[];
    navigation?: boolean;
    pagination?: { clickable: boolean };
    centeredSlides?: boolean;
    breakpoints?: { [width: number]: SwiperOptions; [ratio: string]: SwiperOptions };
    onSwiper?: Dispatch<SetStateAction<Swiper | null>>;
  };
  assets: BannerAssetsProps[];
  sliderContent: (asset: BannerAssetsProps) => React.JSX.Element;
  className?: string;
}

export interface UnifiedBannerProps {
  attributes?: {
    PageType: string;
    CTAValue: string;
    BackgroundImage: {
      data: {
        id: string;
        attributes: {
          url: string;
        };
      };
    };
  };
  id?: string;
  pageType?: string;
  ctaValue?: string;
  backgroundImageUrl?: string;
  ctaType: string;
  ctaLink: string;
  ctaName: string;
  title: string;
  subtitle: string;
  promotionLabel: string;
  imageUrl: string;
}

export interface UnifiedBannersDataType {
  simpleBanners: UnifiedBannerProps[];
  seo?: SeoPagesProps;
  casinoCategories: CasinoLobbyType;
  casinoHorizontalCategories: HorizontalMenuType;
  defaultCasinoCategoryData?: CasinoCategories;
}

export interface SportsPageProps {
  simpleBanners: BannerV2Props[];
  seo?: SeoPagesProps;
}

export interface BannerV2Props {
  id: string;
  attributes: {
    Title: string;
    Subtitle: string;
    CTAName: string;
    CTALink: string;
    CTAType: string;
    PromotionLabel: string;
    BackgroundImage: {
      data: {
        id: string;
        attributes: {
          url: string;
        };
      };
    };
  };
}
