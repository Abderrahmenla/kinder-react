import { BannerV2Props } from '@/graphql/types/bannersTypes';

export interface ImageUrlProps {
  data: {
    attributes: {
      url: string;
    };
  };
}

export interface PaymentLogosProps {
  logos: ImageUrlProps[];
}

export interface VerticalAssetProps {
  Link: string;
  Text: string;
  Image: ImageUrlProps;
}

export interface VerticalAssetsProps {
  verticalAsset: VerticalAssetProps[];
}

export interface LogoImageProps {
  Image: ImageUrlProps;
}

export interface HomepageContentProps {
  bannersv2s: { data: BannerV2Props[] };
  PaymentLogos: LogoImageProps[];
  Verticals: VerticalAssetProps[];
  GamesCategoryDesktopID: string;
  GamesCategoryMobileID: string;
}
