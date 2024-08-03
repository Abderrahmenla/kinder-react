export interface VIPProgramQueryResponse {
  vipProgram: {
    data: VIPProgramData;
  };
}

export interface VIPProgramData {
  id: string;
  attributes: VIPProgramAttributes;
}

export interface VIPProgramAttributes {
  Steps: Step[];
  Level: Level[];
}

export interface Step {
  Text: string;
  Title: string;
  Image: ImageContainer;
}

export interface Level {
  MilestoneBanner: MilestoneBanner;
  Level: string;
  SubLevels: SubLevel[];
}

export interface MilestoneBanner {
  BannerImage: ImageContainer;
  Level: string;
  Prize: string;
  Milestone: string;
  Reward: string;
  RewardAmount: string;
  PrizeLabel: string;
  PrizeLabelIcon: ImageContainer;
  Badge: ImageContainer;
}

export interface SubLevel {
  Icon: ImageContainer;
  Level: string;
  WagerAmount: string;
  CashReward: string;
  BackgroundImage: ImageContainer | null;
}

export interface ImageContainer {
  data: ImageData;
}

export interface ImageData {
  attributes: ImageAttributes;
}

export interface ImageAttributes {
  url: string;
  alternativeText: string | null;
  mime: string;
}

export interface LevelCardBannerProps {
  backgroundImage: string;
}
