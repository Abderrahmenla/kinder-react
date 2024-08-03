import { factory, manyOf, nullable, oneOf, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

// Where all models of each entity on the system are defined.
export const db = factory({
  playerBonusHistory: {
    bonusId: primaryKey(faker.number.int),
    recordCount: nullable(faker.number.int),
    playerBonusId: faker.number.int,
    status: faker.string.alpha,
    totalWagered: faker.number.int,
    bonusAwarded: faker.number.int,
    wageringRequirement: faker.number.int,
    wageringRequirementLeft: faker.number.int,
    redeemedAmount: faker.number.int,
    acceptedDate: nullable(faker.date.recent),
    awardedDate: nullable(faker.date.recent),
    bonusName: faker.string.alpha,
    bonusFriendlyName: faker.string.alpha,
    termAndConditionsId: nullable(faker.string.alpha),
    expirationDate: nullable(faker.date.soon),
    productTypeName: faker.string.alpha,
    lockedAmount: nullable(faker.number.int),
    awardType: nullable(faker.number.int),
    bonusType: nullable(faker.string.alpha),
    categoryId: nullable(faker.number.int),
    bonusDescription: nullable(faker.string.alpha),
    bonusFriendlyDescription: nullable(faker.string.alpha),
    redeemedDate: nullable(faker.date.recent),
    lostDate: nullable(faker.date.recent),
    declinedDate: nullable(faker.date.recent),
    bonusScheduling: nullable(oneOf('rewardsBonusScehduling')),
    bonusAwarding: nullable(oneOf('bonusAwarding')),
    totalNumWagered: nullable(faker.number.int),
    numWageredRequirement: nullable(faker.number.int),
    numWageredRequirementLeft: nullable(faker.number.int),
    wageringContributionMode: faker.string.alpha,
    wageringRequirementChunk: nullable(oneOf('wageringRequirementChunk')),
    bonusItemsAwarded: nullable(faker.string.alpha),
    freeSpinType: nullable(faker.string.alpha),
    customContentList: nullable(manyOf(`rewardsCustomContentList`)),
    bonusAmount: faker.number.int,
    totalWageredBonus: nullable(faker.number.int),
    externalBonusProductSupplier: nullable(faker.string.alpha),
    externalBonusProduct: nullable(faker.string.alpha),
    promotionId: nullable(faker.number.int)
  },
  rewardsBonusScehduling: {
    id: primaryKey(faker.number.int),
    timeToActivatePendingBonus: nullable(faker.number.int),
    timeToRedeemActiveBonus: nullable(faker.number.int),
    timeToAcceptAwardedBonus: nullable(faker.number.int),
    timeToMeetConditionsForWaitingBonus: nullable(faker.number.int),
    timeToStartContributingToWR: nullable(faker.number.int),
    timeToUseFreeSpins: nullable(faker.number.int),
    bonusFixedExpiryDate: nullable(faker.string.alpha),
    bonusCurrentExpiryCondition: nullable(faker.string.alpha),
    bonusCurrentExpiryConditionDate: nullable(faker.string.alpha),
    expirationDateReal: nullable(faker.string.alpha),
    expirationReason: nullable(faker.string.alpha),
    fromDate: faker.string.alpha,
    toDate: faker.string.alpha
  },
  bonusAwarding: {
    id: primaryKey(faker.number.int),
    awardConditionFulfilment: manyOf('awardConditionFulfilment'),
    awardConditionFulfilmentOperator: faker.string.alpha
  },
  awardConditionFulfilment: {
    id: primaryKey(faker.number.int),
    triggerType: faker.string.alpha,
    amount: manyOf('amount'),
    thresholdValue: faker.number.int,
    paymentMethodIDs: faker.datatype.array,
    includedVIPlevelsIDs: faker.datatype.array,
    timePeriodType: faker.string.alpha,
    playerFulfillmentTotal: faker.number.int,
    playerFulfillmentLeft: faker.number.int,
    playerFulfillmentUnit: faker.string.alpha,
    awardConditionMet: faker.datatype.boolean,
    currentDepositNumber: faker.number.int,
    awardTimeType: faker.string.alpha
  },
  amount: {
    id: primaryKey(faker.number.int),
    currency: faker.string.alpha,
    min: faker.number.int,
    max: faker.number.int,
    sequentialNumberOfDeposit: faker.number.int
  },
  wageringRequirementChunk: {
    id: primaryKey(faker.number.int),
    chunkType: faker.string.alpha,
    chunkSize: faker.number.int,
    currentChunkFulfilment: faker.number.int,
    chunkRedeemAmount: faker.number.int
  },
  rewardsCustomContentList: {
    id: primaryKey(faker.number.int),
    language: faker.string.alpha,
    type: faker.string.alpha,
    content: faker.string.alpha
  }
});
