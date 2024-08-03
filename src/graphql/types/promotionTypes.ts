export interface PromotionProps {
  id: string;
  seo: any;
  attributes: {
    Banner: PromotionImageProps;
    PromotionType: string;
    Slug: string;
    PromotionName: string;
    Featured: boolean;
    ShortDescription: string;
    ExpiryDate: string;
    Body: string;
    CountdownDate: string;
    CountdownTitle: string;
    GamesCategoryMobileID: string;
    GamesCategoryDesktopID: string;
  };
}

export interface PromotionsProps {
  promotions: {
    data: PromotionProps[];
  };
}

export interface PromotionImageProps {
  data: {
    id: string;
    attributes: {
      width: string;
      height: string;
      url: string;
    };
  };
}
