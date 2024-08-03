import { EasterCampaignType } from '@/graphql/types/easterCampaignTypes';

export interface Egg {
  eggId: string | number;
  isBonus: boolean;
  isClicked: boolean;
}

export interface EasterTypes {
  mockedEggs: Egg[];
  depositQualified: undefined | boolean;
  easterCampaignData: EasterCampaignType[];
  formattedDate: any;
}

export interface PrizeImage {
  data?: {
    attributes?: {
      url: string;
    };
  };
}

export interface PrizeItem {
  VIPLevelName: string | undefined;
  id: string;
  Text: string;
  Link: string;
  Prize: Array<{
    id: number;
    Name: string;
    Image: PrizeImage;
  }>;
}

export interface EasterData {
  Rules: string;
  VIPLevelPrizes: PrizeItem[];
  GameCategoryDesktop: string;
  GameCategoryMobile: string;
}

export interface EasterCampaignProps {
  easterPrizeData: EasterData;
  easterCampaignData: EasterCampaignType[];
  formattedDate: any;
}

export interface EasterPrizesProps {
  prizes: PrizeItem[];
  depositQualified: undefined | boolean;
}

export interface EasterRulesProps {
  easterRules: string;
}

export interface EasterBannerProps {
  easterCampaignData: EasterCampaignType[];
  depositQualified: undefined | boolean;
}

export interface CountdownProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export type EggCrackerProps = {
  wholeEggImg: string;
  crackedEggImg: string;
  isClicked: boolean;
};
