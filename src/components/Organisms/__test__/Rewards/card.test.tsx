import { PlayerBonusesResponse } from '@/pages/api/rewards/types';
import { RewardsCard } from '../../Rewards/RewardCard';
import { render, screen } from '@/utils/test-utils';

describe('RewardsCard', () => {
  const mockData: PlayerBonusesResponse = {
    promotionId: 1,
    promotionActivationDate: '2023-01-01',
    promotionFriendlyName: 'Sample Promotion',
    promotionName: 'SamplePromo',
    description: 'Sample description',
    optInCode: 'SAMPLE_CODE',
    promotionType: 'WithBonus',
    priority: 1,
    recommended: true,
    recommendedPriority: 1,
    iCoreAggregatedBonusStatus: 'Other',
    promotionStatus: 'NotYetOptedin',
    bonusCategory: 1,
    productTypeId: 1,
    bonusExpirationDate: '2023-12-31',
    couponEventId: 1,
    couponEventTime: '10:00 AM',
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
      fromDate: '2023-08-14T01:33:00+00:00',
      toDate: '2023-08-24T01:33:00+00:00'
    },

    customContentList: [
      {
        language: '',
        type: 'PromotionGroup',
        content: 'Rewards'
      },
      {
        language: '',
        type: 'BonusType',
        content: 'Casino'
      },
      {
        language: '',
        type: 'Level',
        content: '1'
      }
    ],
    bonusName: 'BonusSample',
    promotionEndDate: '2023-12-31',
    bonusType: 'Casino'
  };

  it('should display promotion friendly name', () => {
    render(<RewardsCard promotionData={mockData} refetch={jest.fn()} />);

    expect(screen.getByText(mockData.promotionFriendlyName ?? '')).toBeInTheDocument();
  });
});
