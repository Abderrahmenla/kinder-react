import { PlayerBonusHistory } from '@/pages/api/rewards/types';
import { faker } from '@faker-js/faker';

const bonus1Name = faker.lorem.words(3);

export const REWARD_BONUS_1: PlayerBonusHistory = {
  recordCount: null,
  bonusId: faker.number.int(),
  playerBonusId: faker.number.int(),
  status: 'Redeemed',
  bonusName: bonus1Name,
  bonusFriendlyDescription: faker.lorem.words(10),
  totalWagered: faker.number.int(),
  bonusAwarded: faker.number.int(),
  wageringRequirement: faker.number.int(),
  wageringRequirementLeft: faker.number.int(),
  redeemedAmount: faker.number.int(),
  acceptedDate: faker.date.recent(),
  awardedDate: faker.date.recent(),
  bonusFriendlyName: bonus1Name,
  termAndConditionsId: faker.number.int(),
  expirationDate: faker.date.recent(),
  productTypeName: faker.string.alpha(),
  lockedAmount: faker.number.int(),
  awardType: faker.number.int(),
  bonusType: faker.string.alpha(),
  categoryId: faker.number.int(),
  bonusDescription: faker.string.alpha(),
  redeemedDate: faker.date.recent(),
  lostDate: faker.date.recent(),
  declinedDate: faker.date.recent(),
  bonusScheduling: {
    timeToActivatePendingBonus: null,
    timeToRedeemActiveBonus: null,
    timeToAcceptAwardedBonus: null,
    timeToMeetConditionsForWaitingBonus: null,
    timeToStartContributingToWR: null,
    timeToUseFreeSpins: null,
    bonusFixedExpiryDate: null,
    bonusCurrentExpiryCondition: null,
    bonusCurrentExpiryConditionDate: null,
    expirationDateReal: null,
    expirationReason: null,
    fromDate: faker.date.future().toUTCString(),
    toDate: faker.date.future().toUTCString()
  },
  bonusAwarding: null,
  totalNumWagered: faker.number.int(),
  numWageredRequirement: faker.number.int(),
  numWageredRequirementLeft: faker.number.int(),
  wageringContributionMode: faker.string.alpha(),
  wageringRequirementChunk: {
    chunkType: faker.string.alpha(),
    chunkSize: faker.number.int(),
    currentChunkFulfilment: faker.number.int(),
    chunkRedeemAmount: faker.number.int()
  },
  bonusItemsAwarded: faker.string.alpha(),
  freeSpinType: faker.string.alpha(),
  customContentList: [],
  bonusAmount: faker.number.int(),
  totalWageredBonus: faker.number.int(),
  externalBonusProductSupplier: null,
  externalBonusProduct: null,
  promotionId: faker.number.int()
};
