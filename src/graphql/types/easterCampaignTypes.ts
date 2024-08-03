export enum BonusType {
  Cash = 'Cash',
  Free_Spins = 'Free_Spins',
  Deposit_Bonus = 'Deposit_Bonus',
  Cashback = 'Cashback'
}

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

export type EasterCampaignType = {
  id: number | string;
  attributes: {
    EggPosition: number;
    IsBonus: boolean;
    Date: Date;
    Bonus: BonusSectionType[];
  };
};
