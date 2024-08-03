export interface RewardsBonusScheduling {
  timeToActivatePendingBonus: number | null;
  timeToRedeemActiveBonus: number | null;
  timeToAcceptAwardedBonus: number | null;
  timeToMeetConditionsForWaitingBonus: number | null;
  timeToStartContributingToWR: number | null;
  timeToUseFreeSpins: number | null;
  bonusFixedExpiryDate: string | null;
  bonusCurrentExpiryCondition: string | null;
  bonusCurrentExpiryConditionDate: string | null;
  expirationDateReal: string | null;
  expirationReason: string | null;
  fromDate: string;
  toDate: string;
}

export interface RewardsCustomContentList {
  language: string;
  type: string;
  content: string;
}

export type RewardsPromotionType = 'WithBonus' | 'Custom';

export type RewardsAggregateBonusStatus = 'Available' | 'Active' | 'Success' | 'Failed' | 'Other';
export type RewardsPromotionStatus = 'NotYetOptedin' | 'OptedIn' | 'OptedOut' | 'NoOptinRequired';

export interface PlayerBonusesResponse {
  promotionId: number;
  promotionActivationDate: string;
  promotionFriendlyName: string | null;
  promotionName: string;
  description: string;
  optInCode: string;
  promotionType: RewardsPromotionType;
  priority: number;
  recommended: boolean;
  recommendedPriority: number | null;
  iCoreAggregatedBonusStatus: RewardsAggregateBonusStatus;
  promotionStatus: RewardsPromotionStatus;
  bonusCategory: number | null;
  productTypeId: number;
  bonusExpirationDate: string;
  couponEventId: number | null;
  couponEventTime: string | null;
  bonusScheduling: RewardsBonusScheduling;
  customContentList: RewardsCustomContentList[] | null;
  bonusName: string;
  promotionEndDate: string;
  bonusType: string;
}

export interface PlayerBonusHistory {
  recordCount: null | number;
  bonusId: number;
  playerBonusId: number;
  status: string;
  totalWagered: number;
  bonusAwarded: number;
  wageringRequirement: number;
  wageringRequirementLeft: number;
  redeemedAmount: number;
  acceptedDate: Date | null;
  awardedDate: Date | null;
  bonusName: string;
  bonusFriendlyName: string;
  termAndConditionsId: null | number;
  expirationDate: Date | null;
  productTypeName: string;
  lockedAmount: null | number;
  awardType: number | null;
  bonusType: string | null;
  categoryId: null | number;
  bonusDescription: string | null;
  bonusFriendlyDescription: string | null;
  redeemedDate: Date | null;
  lostDate: Date | null;
  declinedDate: Date | null;
  bonusScheduling: RewardsBonusScheduling;
  bonusAwarding: null | {
    awardConditionFulfilment: [
      {
        triggerType: string;
        amount: {
          currency: string;
          min: number;
          max: number;
          sequentialNumberOfDeposit: number;
        }[];
        thresholdValue: number;
        paymentMethodIDs: number[];
        includedVIPlevelsIDs: number[];
        timePeriodType: string;
        playerFulfillmentTotal: number;
        playerFulfillmentLeft: number;
        playerFulfillmentUnit: string;
        awardConditionMet: boolean;
        currentDepositNumber: number;
        awardTimeType: string;
      }
    ];
    awardConditionFulfilmentOperator: string;
  };
  totalNumWagered: number | null;
  numWageredRequirement: null | number;
  numWageredRequirementLeft: null | number;
  wageringContributionMode: string;
  wageringRequirementChunk: null | {
    chunkType: string;
    chunkSize: number;
    currentChunkFulfilment: number;
    chunkRedeemAmount: number;
  };
  bonusItemsAwarded: null | string;
  freeSpinType: null | string;
  customContentList: null | RewardsCustomContentList[];
  bonusAmount: number | number;
  totalWageredBonus: number | null;
  externalBonusProductSupplier: null;
  externalBonusProduct: null;
  promotionId: number | null;
}
