export enum PrizeType {
  Bonus = 'Bonus',
  Prize_Draw = 'Prize_Draw',
  Tournament = 'Tournament',
  No_Prize = 'No_Prize'
}

export enum BonusType {
  Cash = 'Cash',
  Free_Spins = 'Free_Spins',
  Deposit_Bonus = 'Deposit_Bonus',
  Cashback = 'Cashback'
}
type PrizeBanner = {
  data: {
    id: number;
    attributes: {
      name: string;
      url: string;
      previewUrl: string;
      width: number;
      height: number;
      caption: string;
    };
  };
};

type ImageType = {
  data: {
    id: number;
    attributes: {
      url: string;
      width: number;
      height: number;
    };
  };
};

export type BonusSectionType = {
  id: number;
  OptInCode: string;
  BonusType: BonusType;
  VIPLevel: string;
  PrizeName: string;
  Image: ImageType;
  PrizeActivationInfo: string;
};

export type ChristmasGiveawayType = {
  attributes: {
    Day: number;
    PrizeType: PrizeType;
    BannerLink: string;
    PrizeBanner: PrizeBanner;
    BonusSection: BonusSectionType[];
  };
};

export type EasterCampaignType = {
  attributes: {
    id: string;
    Date: Date;
    IsBonus: boolean;
    EggPosition: number;
    Bonus: BonusSectionType[];
  };
};
